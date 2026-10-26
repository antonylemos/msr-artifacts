// src/api/services/user.service.sql.js
import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs'; // Needed for password changes if handled here
import { sendInvitationEmail } from '../utils/emailSender.js'; // Assuming this is your email utility
import crypto from 'crypto';

// Helper to sanitize user data and parse JSON fields if needed
// (This should be consistent with how AuthServiceSQL handles it)
const mapDbUserToUserObject = (dbUser) => {
    if (!dbUser) return null;
    // eslint-disable-next-line no-unused-vars
    const { hashedPassword, passwordResetToken, passwordResetExpires, invitationToken, invitationExpires, twoFactorSecret, ...user } = dbUser;
    
    // Ensure roles is an array of objects with parsed permissions
    let parsedRoles = [];
    if (dbUser.roles_agg) { // If using the roles_agg from a JOIN and aggregation
        parsedRoles = dbUser.roles_agg.map(role => ({
            id: role.id,
            name: role.name,
            permissions: typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions || {}
        }));
    } else if (Array.isArray(dbUser.roles)) { // If roles are passed as a separate array
        parsedRoles = dbUser.roles.map(role => ({
            id: role.id,
            name: role.name,
            permissions: typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions || {}
        }));
    }
    user.roles = parsedRoles.filter(r => r.id !== null); // Filter out potential [null] from empty aggregation

    // Parse other JSON fields that postgres.js might return as strings from complex queries
    const jsonFields = ['workingHours', 'permissionOverrides', 'deactivationDetails', 'customFields', 'certifications', 'performanceMetricsSummary', 'currentWorkLocationDetails'];
    jsonFields.forEach(field => {
        if (user[field] && typeof user[field] === 'string') {
            try { user[field] = JSON.parse(user[field]); } catch (e) { /* ignore parse error, keep as string or set null */ }
        } else if (user[field] === null && (field === 'workingHours' || field === 'skills')) {
            // Ensure arrays are empty arrays not null if that's frontend expectation
            if (field === 'workingHours' || field === 'skills') user[field] = []; 
        }
    });
    if(user.skills === null) user.skills = []; // Ensure skills is an array

    return user;
};

// Helper to build dynamic SET clauses for UPDATE statements
const buildUpdateSetClause = (dataObject, allowedFields, startingPlaceholderIndex = 1) => {
    const setParts = [];
    const values = [];
    let placeholderIndex = startingPlaceholderIndex;

    allowedFields.forEach(field => {
        if (dataObject.hasOwnProperty(field)) { // Check if key exists, even if value is null
            const dbFieldName = field; // Assuming field name matches DB column name (adjust if mapping needed)
            
            if (dataObject[field] === null) {
                setParts.push(`"${dbFieldName}" = NULL`);
            } else if (typeof dataObject[field] === 'object' && !Array.isArray(dataObject[field])) { // JSON objects
                setParts.push(`"${dbFieldName}" = $${placeholderIndex++}`);
                values.push(sql.json(dataObject[field]));
            } else if (Array.isArray(dataObject[field]) && (dbFieldName === 'skills' || dbFieldName === 'preferredNotificationChannels')) { // String arrays
                 setParts.push(`"${dbFieldName}" = $${placeholderIndex++}`);
                 values.push(dataObject[field]); // postgres.js handles array of strings
            }
            // Add other specific type handling if needed (e.g. for workingHours which is array of objects)
            else if (dbFieldName === 'workingHours' && Array.isArray(dataObject[field])) {
                setParts.push(`"${dbFieldName}" = $${placeholderIndex++}`);
                values.push(sql.json(dataObject[field]));
            } else { // Primitives (string, number, boolean)
                setParts.push(`"${dbFieldName}" = $${placeholderIndex++}`);
                values.push(dataObject[field]);
            }
        }
    });
    if (setParts.length === 0) return { clause: "", values: [] };
    return { clause: `SET ${setParts.join(', ')}`, values };
};




export const inviteUser = async ({ email, firstName, lastName, roleIds, organizationId, invitedByUserId }) => {
  // 1. Validate that all roleIds exist and belong to the given organization
  if (!Array.isArray(roleIds) || roleIds.length === 0) {
    throw new ApiError(400, "At least one role ID must be provided.");
  }
  // Use `COUNT(*)` to check if the number of valid roles matches the input array length
  const [{ count: rolesCount }] = await sql`
    SELECT COUNT(*) FROM "Role" WHERE id = ANY(${roleIds}) AND "organizationId" = ${organizationId}
  `;
  if (parseInt(rolesCount, 10) !== roleIds.length) {
    throw new ApiError(400, 'One or more provided role IDs are invalid or do not belong to this organization.');
  }

  // 2. Check if a user with this email already exists in this specific organization
  const [existingUser] = await sql`
    SELECT id FROM "User" WHERE email = ${email.toLowerCase()} AND "organizationId" = ${organizationId}
  `;
  if (existingUser) {
    throw new ApiError(409, `A user with email ${email} already exists in this organization.`);
  }

  // Generate token and expiry date (application logic, no change)
  const invitationToken = crypto.randomBytes(32).toString('hex');
  const invitationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  let invitedUserRecord;
  try {
    // 3. Use a transaction to create the user and all related records atomically
    invitedUserRecord = await sql.begin(async sqlTx => {
      // STEP A: Create the new User record
      const [newUser] = await sqlTx`
        INSERT INTO "User" (
          email, "firstName", "lastName", "fullName", "organizationId", 
          "invitationToken", "invitationExpires", "invitedByUserId", 
          "isActiveAccount", "isEmailVerified", "agentStatusAfterLogin"
        ) VALUES (
          ${email.toLowerCase()}, ${firstName}, ${lastName}, ${`${firstName} ${lastName}`}, ${organizationId},
          ${invitationToken}, ${invitationExpires}, ${invitedByUserId},
          false, false, 'offline'
        ) RETURNING *`; // RETURNING * gets the full new user object, including the ID

      // STEP B: Link the user to the provided roles in the `_UserRoles` join table
      const roleLinks = roleIds.map(roleId => ({ "A": roleId, "B": newUser.id }));
      if (roleLinks.length > 0) {
        // Use the sql helper for bulk inserts, which is very efficient
        await sqlTx`INSERT INTO "_UserRoles" ${sqlTx(roleLinks, 'A', 'B')}`;
      }

      // STEP C: Find the "General" team for the organization
      const [generalTeam] = await sqlTx`
        SELECT id FROM "Team" WHERE "organizationId" = ${organizationId} AND "isGeneralTeam" = true
      `;
      if (!generalTeam) {
        console.error(`CRITICAL: General Team not found for organization ${organizationId} during user invitation.`);
        // Throwing an error here will automatically roll back the transaction
        throw new ApiError(500, 'System configuration error: General Team missing for this organization.');
      }
      
      // STEP D: Add the new user to the "General" team
      await sqlTx`
        INSERT INTO "UserTeamMembership" ("userId", "teamId", "priorityLevel") 
        VALUES (${newUser.id}, ${generalTeam.id}, 99)
      `;

      return newUser; // The transaction will return the newly created user object
    });

  } catch (error) {
    console.error("Error during user invitation transaction:", error);
    // If it's a unique constraint violation from the DB (e.g., race condition)
    if (error.code === '23505') {
        throw new ApiError(409, "A user with this email was just created. Please try again or use a different email.");
    }
    // Re-throw other errors (like the ApiError for missing General Team)
    if (error instanceof ApiError) throw error;
    // Generic fallback
    throw new ApiError(500, "Failed to create user invitation due to a database error.");
  }


  // 4. Send Invitation Email (outside of the database transaction)
  if (invitedUserRecord && invitedUserRecord.invitationToken) {
    // Fetch organization name for a nicer email
    const [organization] = await sql`
      SELECT name FROM "Organization" WHERE id = ${organizationId}
    `;
    const orgNameForEmail = organization ? organization.name : "Your Organization";

    sendInvitationEmail(
      invitedUserRecord.email,
      `${invitedUserRecord.firstName} ${invitedUserRecord.lastName}`,
      invitedUserRecord.invitationToken,
      orgNameForEmail
    ).catch(emailError => {
      // Log this error but don't fail the entire API request, as the user is already created.
      // You might want a background job to retry failed emails.
      console.error("Failed to send invitation email after user creation:", emailError);
    });
  }

  // 5. Return a success response to the client
  // Don't include the invitation token in the API response
  return {
    id: invitedUserRecord.id,
    email: invitedUserRecord.email,
    message: "Invitation has been sent successfully."
  };
};

// ... (other service functions)


export const bulkInviteUsers = async ({ usersToInvite, organizationId, invitedByUserId }) => {
  const createdUsers = [];
  const failedInvites = [];

  // --- PRE-VALIDATION ---
  // We define all the variables we need for validation here, in the outer scope.
  
  const allRoleIds = [...new Set(usersToInvite.flatMap(u => u.roleIds || []))];
  const allTeamIds = [...new Set(usersToInvite.flatMap(u => u.teamIds || []))];

  const [rolesCount, teamsCount, existingUsers] = await Promise.all([
    allRoleIds.length > 0 ? prisma.role.count({ where: { id: { in: allRoleIds }, organizationId } }) : 0,
    allTeamIds.length > 0 ? prisma.team.count({ where: { id: { in: allTeamIds }, organizationId } }) : 0,
    prisma.user.findMany({
      where: {
        email: { in: usersToInvite.map(u => u.email.toLowerCase()) },
        organizationId
      },
      select: { email: true }
    })
  ]);
  
  // THIS is the variable that was causing the error. It's now correctly defined
  // in the outer scope, so the transaction block below can access it.
  const existingEmailsSet = new Set(existingUsers.map(u => u.email));

  if (rolesCount !== allRoleIds.length) {
    throw new Error('One or more role IDs provided in the batch are invalid for this organization.');
  }
  if (teamsCount !== allTeamIds.length) {
    throw new Error('One or more team IDs provided in the batch are invalid for this organization.');
  }
  
  // --- DATABASE TRANSACTION ---
  // The transaction block is a "closure" and has access to existingEmailsSet,
  // createdUsers, and failedInvites from its parent scope.
  await prisma.$transaction(async (tx) => {
    const generalTeam = await tx.team.findFirst({
      where: { organizationId, isGeneralTeam: true },
      select: { id: true },
    });
    if (!generalTeam) throw new Error(`Critical Error: General Team not found for organization ${organizationId}.`);

    for (const user of usersToInvite) {
      // THIS IS LINE 83 (approx). It can now see 'existingEmailsSet'.
      if (existingEmailsSet.has(user.email.toLowerCase())) {
        failedInvites.push({ email: user.email, reason: "A user with this email already exists." });
        continue;
      }

      const invitationToken = crypto.randomBytes(32).toString('hex');
      const invitationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const newUser = await tx.user.create({
        data: {
          email: user.email.toLowerCase(),
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          organizationId,
          invitationToken,
          invitationExpires,
          invitedByUserId,
          isActiveAccount: false,
          permissionOverrides: user.permissionOverrides || undefined,
          roles: {
            connect: (user.roleIds || []).map(id => ({ id })),
          },
        },
      });
      
      const allTeamIdsToJoin = new Set([generalTeam.id, ...(user.teamIds || [])]);
      await tx.userTeamMembership.createMany({
        data: Array.from(allTeamIdsToJoin).map(teamId => ({
          userId: newUser.id,
          teamId: teamId,
        }))
      });

      createdUsers.push({ email: user.email, userId: newUser.id, invitationToken });
    }
  }, {
      // The options object with the new timeout
      timeout: 30000, // 30 seconds
    }
);

  return { createdUsers, failedInvites };
};


  
export const acceptInvitation = async ({ token, password, firstName, lastName }) => {
  const user = await prisma.user.findFirst({
    where: {
      invitationToken: token, // Uses token
      invitationExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired invitation token.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updateData = {
    hashedPassword,
    isActiveAccount: true,
    isEmailVerified: true, // Typically, accepting an invite verifies the email
    joinedDate: new Date(),
    invitationToken: null,
    invitationExpires: null,
  };
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (firstName && lastName) updateData.fullName = `${firstName} ${lastName}`;
  else if (firstName && !lastName) updateData.fullName = firstName; // Handle partial name update
  else if (!firstName && lastName && user.firstName) updateData.fullName = `${user.firstName} ${lastName}`;


  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  return updatedUser;
};



export const listUsersService = async (organizationId, queryOptions = {}) => {
  const {
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    filters = {}
  } = queryOptions;

  const offset = (page - 1) * limit;
  const conditions = [sql`u."organizationId" = ${organizationId}`];

  const validSortColumns = {
    fullName: sql`u."fullName"`,
    email: sql`u.email`,
    createdAt: sql`u."createdAt"`,
    updatedAt: sql`u."updatedAt"`,
    jobTitle: sql`u."jobTitle"`
  };

  if (filters.isActiveAccount !== undefined) {
    conditions.push(sql`u."isActiveAccount" = ${filters.isActiveAccount}`);
  }

  if (filters.searchTerm?.trim()) {
    const pattern = `%${filters.searchTerm}%`;
    conditions.push(sql`(u."fullName" ILIKE ${pattern} OR u.email ILIKE ${pattern})`);
  }

 
  const whereClause = conditions.length
  ? sql`WHERE ${conditions.reduce((acc, cond, i) => i === 0 ? cond : sql`${acc} AND ${cond}`, sql``)}`
  : sql``;

  const orderByColumn = validSortColumns[sortBy] || validSortColumns.createdAt;
  const orderByDirection = sortOrder.toLowerCase() === 'asc' ? sql`ASC` : sql`DESC`;

  try {
    const usersQuery = sql`
      SELECT 
        u.id, u."firstName", u."lastName", u."fullName", u.email, 
        u."profilePictureUrl", u."jobTitle", u."isActiveAccount", 
        u."isBanned", u."isEmailVerified", u."invitationToken",
        u."agentStatusAfterLogin", u."createdAt", u."updatedAt",
        u."organizationId",
        COALESCE(
          (
            SELECT json_agg(json_build_object('id', r.id, 'name', r.name)) 
            FROM "_UserRoles" ur_join 
            JOIN "Role" r ON r.id = ur_join."A" 
            WHERE ur_join."B" = u.id
          ), 
          '[]'::json
        ) as roles_agg
      FROM "User" u
      ${whereClause}
      ORDER BY ${orderByColumn} ${orderByDirection}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countQuery = sql`
      SELECT COUNT(*)::int as count
      FROM "User" u
      ${whereClause}
    `;

    const [users, [{ count: totalUsers }]] = await Promise.all([
      usersQuery,
      countQuery
    ]);

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("listUsersService error:", error);
    throw new ApiError(500, "Failed to retrieve users.");
  }
};


//sql
export const getUserByIdService = async (userId, requestingUserOrganizationId) => {
  // Query to fetch user and join with roles and organization
  const [userFromDb] = await sql`
    SELECT u.*,
           o.name as "organizationName", 
           COALESCE(
               (SELECT json_agg(json_build_object('id', r.id, 'name', r.name, 'permissions', r.permissions))
                FROM "_UserRoles " ur_join
                JOIN "Role" r ON r.id = ur_join."A"
                WHERE ur_join."B" = u.id),
               '[]'::json
           ) AS roles_agg,
           COALESCE(
               (SELECT json_agg(json_build_object('id', t.id, 'name', t.name))
                FROM "UserTeamMembership" utm
                JOIN "Team" t ON t.id = utm."teamId"
                WHERE utm."userId" = u.id),
                '[]'::json
           ) AS teams_agg
    FROM "User" u
    LEFT JOIN "Organization" o ON o.id = u."organizationId"
    WHERE u.id = ${userId}
    GROUP BY u.id, o.id, o.name
  `;

  if (!userFromDb) {
    throw new ApiError(404, "User not found.");
  }
  if (userFromDb.organizationId !== requestingUserOrganizationId) {
    throw new ApiError(403, "Forbidden: User does not belong to your organization.");
  }

  // Map teamMemberships
  const mappedUser = mapDbUserToUserObject(userFromDb);
  if (mappedUser) {
      mappedUser.teamMemberships = userFromDb.teams_agg.map(t_raw => ({team: t_raw}));
  }

  return mappedUser;
};




// sql-
export const getAgentStatusPolicyService = async (userId, requestingUserOrganizationId) => {
    const [user] = await sql`
        SELECT id, "agentStatusAfterLogin", "workingHours", "organizationId" 
        FROM "User" WHERE id = ${userId}`;
    if (!user) throw new ApiError(404, "User not found.");
    if (user.organizationId !== requestingUserOrganizationId) throw new ApiError(403, "Forbidden.");

    const response = {
        userId: user.id,
        agentStatusAfterLogin: user.agentStatusAfterLogin || 'offline',
    };
    if (user.agentStatusAfterLogin === 'according_to_working_hours') {
        response.workingHours = (user.workingHours && typeof user.workingHours === 'string') 
            ? JSON.parse(user.workingHours) 
            : (user.workingHours || []);
    }
    return response;
};


// sql

export const updateAgentStatusPolicyService = async (userId, newStatusPolicy, requestingUserOrganizationId) => {
    const [user] = await sql`SELECT id, "organizationId" FROM "User" WHERE id = ${userId}`;
    if (!user) throw new ApiError(404, "User not found.");
    if (user.organizationId !== requestingUserOrganizationId) throw new ApiError(403, "Forbidden.");
    if (!['online', 'offline', 'according_to_working_hours'].includes(newStatusPolicy)) {
      throw new ApiError(400, "Invalid agentStatusAfterLogin value.");
    }

    const [updatedUser] = await sql`
        UPDATE "User" 
        SET "agentStatusAfterLogin" = ${newStatusPolicy}, "updatedAt" = NOW()
        WHERE id = ${userId} 
        RETURNING id, "agentStatusAfterLogin"`;
    if(!updatedUser) throw new ApiError(500, "Failed to update agent status policy.");
    return updatedUser;
};


//sql
export const updateUserProfileService = async (userId, dataToUpdate, requestingUserOrganizationId) => {
  const {
    groupsToAdd, // Array of group IDs
    groupsToRemove, // Array of group IDs
    ...profileFields // Rest are direct user fields
  } = dataToUpdate;

  const targetUser = (await sql`SELECT id, "organizationId" FROM "User" WHERE id = ${userId}`)[0];
  if (!targetUser) throw new ApiError(404, "User not found.");
  if (targetUser.organizationId !== requestingUserOrganizationId) {
    throw new ApiError(403, "Forbidden: Cannot update user from another organization.");
  }

  // Define fields allowed to be updated on the User table directly by this service
  const allowedProfileFields = [
    "fullName", "jobTitle", "maxConcurrentChats", 
    "profilePictureUrl", "phoneNumber", "timezone", "workingHours"
    // DO NOT include agentStatusAfterLogin if it's handled by a separate service
  ];

  try {
    const result = await sql.begin(async sqlTx => {
      // Update direct user profile fields
      const { clause: setClause, values: setValues } = buildUpdateSetClause(profileFields, allowedProfileFields);
      let updatedUserFromDb;

      if (setClause) {
        const updateQuery = `UPDATE "User" ${setClause}, "updatedAt" = NOW() WHERE id = $${setValues.length + 1} RETURNING *`;
        [updatedUserFromDb] = await sqlTx.unsafe(updateQuery, [...setValues, userId]); // Using sqlTx for transaction
      } else {
        [updatedUserFromDb] = await sqlTx`SELECT * FROM "User" WHERE id = ${userId}`; // Fetch if no direct fields updated
      }
      
      // Handle Group Membership Changes
      if (Array.isArray(groupsToRemove) && groupsToRemove.length > 0) {
        // Get General Team ID to prevent removal (important)
        const [generalTeam] = await sqlTx`SELECT id FROM "Team" WHERE "organizationId" = ${requestingUserOrganizationId} AND "isGeneralTeam" = true`;
        const actualGroupsToRemove = generalTeam 
            ? groupsToRemove.filter(id => id !== generalTeam.id) 
            : groupsToRemove;
        if (actualGroupsToRemove.length > 0) {
            await sqlTx`DELETE FROM "UserTeamMembership" WHERE "userId" = ${userId} AND "teamId" IN ${sql(actualGroupsToRemove)}`;
        }
      }
      if (Array.isArray(groupsToAdd) && groupsToAdd.length > 0) {
        // Ensure groupsToAdd are valid for the organization (Validation ideally before transaction or at start)
        const validGroups = await sqlTx`SELECT id FROM "Team" WHERE "organizationId" = ${requestingUserOrganizationId} AND id IN ${sql(groupsToAdd)}`;
        const validGroupIdsToAdd = validGroups.map(g => g.id);

        if (validGroupIdsToAdd.length > 0) {
            const groupInserts = validGroupIdsToAdd.map(teamId => ({ userId, teamId, priorityLevel: 1, assignedAt: new Date() }));
            if (groupInserts.length > 0) {
                 // For createMany equivalent with ON CONFLICT DO NOTHING (if M2M has unique constraint)
                await sqlTx`INSERT INTO "UserTeamMembership" ${sql(groupInserts, 'userId', 'teamId', 'priorityLevel', 'assignedAt')} ON CONFLICT ("userId", "teamId") DO NOTHING`;
            }
        }
      }

      // Re-fetch the user with relations for the response
      const [finalUser] = await sqlTx`
        SELECT u.*, 
               COALESCE((SELECT json_agg(json_build_object('id', r.id, 'name', r.name)) FROM "_UserRoles " ur JOIN "Role" r ON r.id = ur."A" WHERE ur."B" = u.id), '[]'::json) as roles,
               COALESCE((SELECT json_agg(json_build_object('id', t.id, 'name', t.name)) FROM "UserTeamMembership" utm JOIN "Team" t ON t.id = utm."teamId" WHERE utm."userId" = u.id), '[]'::json) as teamMembershipsRaw
        FROM "User" u
        WHERE u.id = ${userId}
        GROUP BY u.id`; // Group by u.id if using aggregates on User itself

      // Map teamMembershipsRaw to a cleaner structure if needed
      if (finalUser) {
          finalUser.teamMemberships = finalUser.teamMembershipsRaw.map(t_raw => ({team: t_raw}));
          delete finalUser.teamMembershipsRaw;
          delete finalUser.hashedPassword; // Sanitize
      }
      return finalUser;
    });
    return result;
  } catch (error) {
    console.error(`Error in updateUserProfileService for user ${userId}:`, error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to update user profile.");
  }
}


//sql
export const changeUserRoleService = async ({ authenticatedUserId, authenticatedUserPermissions, organizationId, userIdToChange, newRoleName, }) => {
    // ... (Implementation from previous response using raw SQL) ...
    // Ensure it finds role by name & orgId, checks permissions, then updates _UserRoles  or UserRole
    // Example:
    const [targetUserForRoleChange] = await sql`SELECT id, "organizationId" FROM "User" WHERE id = ${userIdToChange}`;
    // ... permission checks ...
    const [newRole] = await sql`SELECT id FROM "Role" WHERE name = ${newRoleName} AND "organizationId" = ${organizationId}`;
    if(!newRole) throw new ApiError(400, `Role ${newRoleName} not found.`);

    // This assumes an M2M join table _UserRoles  with columns A (roleId) and B (userId)
    // For a single role assignment, you might delete existing roles first if using explicit UserRole table:
    // await sql`DELETE FROM "UserRole" WHERE "userId" = ${userIdToChange}`;
    // await sql`INSERT INTO "UserRole" ("userId", "roleId") VALUES (${userIdToChange}, ${newRole.id})`;
    // Or for implicit _UserRoles  (assuming user can have multiple roles, or you handle single role logic)
    // To set a single role (replacing others) for implicit _UserRoles :
    await sql.begin(async sqlTx => {
        await sqlTx`DELETE FROM "_UserRoles " WHERE "B" = ${userIdToChange}`; // Delete old role links
        await sqlTx`INSERT INTO "_UserRoles " ("A", "B") VALUES (${newRole.id}, ${userIdToChange})`; // Add new one
    });
    return getUserByIdService(userIdToChange, organizationId); // Return updated user
};


//sql
export const deleteUserService = async (userIdToDelete, adminUserId, organizationId) => {
    const [targetUser] = await sql`SELECT id, "organizationId" FROM "User" WHERE id = ${userIdToDelete}`;
    if (!targetUser) throw new ApiError(404, "User to delete not found.");
    if (targetUser.organizationId !== organizationId) throw new ApiError(403, "Forbidden.");
    if (targetUser.id === adminUserId) throw new ApiError(400, "Cannot delete yourself.");
    // Add check for last owner if necessary

    // Consider ON DELETE rules in your DB schema for related data (UserTeamMembership, _UserRoles  etc.)
    // If not set to CASCADE, you might need to delete related records manually here within a transaction.
    const result = await sql`DELETE FROM "User" WHERE id = ${userIdToDelete} RETURNING id`;
    if (result.count === 0) throw new ApiError(500, "Failed to delete user.");
    return { message: `User ID ${userIdToDelete} deleted successfully.` };
};

export const adminChangeUserPasswordService = async (userIdToChange, newPassword, adminOrganizationId) => {
  // 1. Fetch the target user
  const targetUser = await prisma.user.findUnique({
    where: { id: userIdToChange }
  });

  if (!targetUser) {
    throw new ApiError(404, "Target user not found.");
  }

  // 2. Security Check: Ensure target user is in the same organization as the admin
  if (targetUser.organizationId !== adminOrganizationId) {
    throw new ApiError(403, "Forbidden: Cannot change password for a user in a different organization.");
  }

  // Optional: Prevent admin from changing Owner's password this way if Owner is special
  // const targetUserRoles = await prisma.role.findMany({ where: { users: { some: { id: userIdToChange }}}});
  // if (targetUserRoles.some(role => role.name === 'Owner')) {
  //    throw new ApiError(403, "Forbidden: Owner passwords must be changed through a different process or by the Owner themselves.");
  // }


  // 3. Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 4. Update the user's password
  await prisma.user.update({
    where: { id: userIdToChange },
    data: {
      hashedPassword: hashedPassword,
      lastPasswordChangeAt: new Date(),
      // Invalidate password reset tokens if any were active for this user
      passwordResetToken: null,
      passwordResetExpires: null,
    }
  });

  // Security Best Practice: Notify the user whose password was changed by an admin
  // TODO: Implement sendPasswordChangedByAdminEmail(targetUser.email, targetUser.fullName);
  console.log(`ADMIN ACTION: Password changed for user ${targetUser.email} (ID: ${userIdToChange})`);

  return { success: true };
};





export const changeUserPasswordService = async ({
    authenticatedUserId,
    authenticatedUserPermissions, // Set of strings like 'user:manage_passwords_any' or 'system:all'
    authenticatedUserOrganizationId,
    targetUserId,
    newPassword,
}) => {
  // 1. Fetch the target user
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: { roles: true } // Include roles to check if target is Owner (optional)
  });

  if (!targetUser) {
    throw new ApiError(404, "Target user not found.");
  }

  // --- PERMISSION LOGIC ---
  const isChangingOwnPassword = authenticatedUserId === targetUserId;

  if (isChangingOwnPassword) {
    // User is changing their own password. This is generally allowed if authenticated.
    // No additional permission string check needed beyond being authenticated.
  } else {
    // Authenticated user is trying to change SOMEONE ELSE'S password.
    // This requires specific admin-level permissions.
    if (!(authenticatedUserPermissions.has('system:all') || authenticatedUserPermissions.has('user:manage_passwords_any'))) {
      // Example permission: 'user:manage_passwords_any'
      throw new ApiError(403, "Forbidden: You do not have permission to change another user's password.");
    }

    // Security Check: Ensure target user is in the same organization as the admin
    if (targetUser.organizationId !== authenticatedUserOrganizationId) {
      throw new ApiError(403, "Forbidden: Cannot change password for a user in a different organization.");
    }

    // Optional: Prevent admins from changing an Owner's password directly
    // (Owner should ideally change their own password or go through a recovery flow)
    if (targetUser.roles.some(role => role.name === 'Owner')) {
        // Allow if the requester is also an Owner (e.g. one owner helping another, though unusual)
        // but typically an Admin shouldn't change an Owner's password.
        if (!authenticatedUserPermissions.has('system:all')) { // Only another Owner can touch an Owner
             throw new ApiError(403, "Forbidden: Only an Owner can manage another Owner's account details through this mechanism.");
        }
    }
  }

  // Optional: Prevent setting the same password again (if targetUser.hashedPassword was fetched)
  if (targetUser.hashedPassword && await bcrypt.compare(newPassword, targetUser.hashedPassword)) {
     throw new ApiError(400, "New password cannot be the same as the current password.");
  }

  // 2. Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 3. Update the user's password
  await prisma.user.update({
    where: { id: targetUserId },
    data: {
      hashedPassword: hashedPassword,
      lastPasswordChangeAt: new Date(),
      passwordResetToken: null, // Invalidate any pending password reset tokens
      passwordResetExpires: null,
    }
  });

  // Security Notification
  if (isChangingOwnPassword) {
    // TODO: Send email to user: "Your password was successfully changed."
    console.log(`USER ACTION: Password changed for user ${targetUser.email} (ID: ${targetUserId}) by themselves.`);
  } else {
    // TODO: Send email to user: "An administrator has changed your password."
    // TODO: Also consider notifying other admins/owners of this action for audit purposes.
    console.log(`ADMIN ACTION: Password changed for user ${targetUser.email} (ID: ${targetUserId}) by admin ${authenticatedUserId}.`);
  }

  return { success: true, message: "Password changed successfully." };
};





export const getUserTeams = async (userId) => {
  if (!userId) {
    // Return an empty array if no user ID is provided.
    return [];
  }

  try {
    // This query joins the UserTeamMembership table with the Team table
    // to get the full details for each team the user is in.
    const teams = await sql`
      SELECT 
        t.id,
        t.name,
        t."organizationId",
        t."isGeneralTeam"
      FROM "Team" t
      JOIN "UserTeamMembership" utm ON t.id = utm."teamId"
      WHERE utm."userId" = ${userId};
    `;
    return teams;
  } catch (error) {
    console.error(`Error fetching teams for user ${userId}:`, error);
    throw new ApiError(500, "Could not retrieve user's teams.");
  }
};







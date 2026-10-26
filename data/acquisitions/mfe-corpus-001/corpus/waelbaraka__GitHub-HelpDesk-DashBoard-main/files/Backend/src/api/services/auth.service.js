// src/api/services/auth.service.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // For password reset token generation
import { ApiError } from '../utils/ApiError.js'; // Your custom error class
import sql from '../../db/sqlClient.js'; // Your configured postgres.js client
import { getInstalledModulesForOrganization } from '../services/moduleInstallation.service.js'; // Import the new service


 const mapDbUserToUserObject = (dbUserRow) => {
    if (!dbUserRow) return null;
    
    // Destructure ALL fields selected in the SQL query for user
    const { 
        hashedPassword, 
        passwordResetToken, 
        passwordResetExpires, 
        invitationToken, 
        invitationExpires, 
        twoFactorSecret, 
        roles_json_agg,         // From the loginUser SQL query
        "organization.id": orgIdFromQuery, // From the loginUser SQL query
        "organization.name": orgNameFromQuery, // From the loginUser SQL query
        // For getProfileData, these would be organizationDataId, organizationName
        organizationDataId, 
        organizationName,
        ...userFields // Remaining fields from u.*
    } = dbUserRow;
    
    const user = { ...userFields }; // Base user fields

    // Process roles
    user.roles = (roles_json_agg || []).map(role => ({
        id: role.id,
        name: role.name,
        permissions: (typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions) || {}
    }));

    // Add organization object IF the specific aliases from the calling query exist
    if (orgIdFromQuery !== undefined && orgNameFromQuery !== undefined) { // From loginUser query
        user.organization = { id: orgIdFromQuery, name: orgNameFromQuery };
    } else if (organizationDataId !== undefined && organizationName !== undefined) { // From getProfileData query
        user.organization = { id: organizationDataId, name: organizationName };
    }
    // Note: user.organizationId (the foreign key) should already be part of ...userFields from u.*

    return user;
};

class AuthService {


async registerOwnerAndOrganization({
    organizationName,
    ownerFirstName,
    ownerLastName,
    ownerEmail,
    ownerPassword,
  }) {
    console.log("SERVICE: Attempting to register Owner and Organization:", { organizationName, ownerEmail });

    // Pre-transaction validation checks
    // Using count > 0 is slightly more robust than checking array length if sql client returns { count: N }
    const existingOrgCount = await sql`SELECT COUNT(*) as count FROM "Organization" WHERE name = ${organizationName}`;
    if (existingOrgCount[0].count > 0) {
      throw new ApiError(409, `Organization name "${organizationName}" is already taken.`);
    }

    const existingUserCount = await sql`SELECT COUNT(*) as count FROM "User" WHERE email = ${ownerEmail.toLowerCase()}`;
    if (existingUserCount[0].count > 0) {
      throw new ApiError(409, `Email "${ownerEmail}" is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(ownerPassword, 10);

    try {
      const result = await sql.begin(async sqlTx => {
        console.log("SERVICE: Transaction started.");

        // STEP 1: Create the Organization
        const [newOrganization] = await sqlTx`
          INSERT INTO "Organization" (name, timezone, "defaultLanguage", currency, "weekStartsOn", "chatAssignmentMode", "createdAt", "updatedAt") 
          VALUES (${organizationName}, ${'Etc/UTC'}, ${'en'}, ${'USD'}, ${'sunday'}, ${'auto'}, NOW(), NOW()) 
          RETURNING *`;
        if (!newOrganization || !newOrganization.id) throw new Error("Failed to create organization or retrieve its ID.");
        const organizationId = newOrganization.id;
        console.log(`SERVICE: Organization created: ${newOrganization.name} (ID: ${organizationId})`);

        // STEP 2: Define Standard Role Permissions
        const ownerPermissions = { "system:all": true };
        const agentPermissions = { "chat:handle": true, "user:profile_read_own": true, "user:profile_update_own": true, "user:password_change_own": true };
        const adminBasePermissions = { ...agentPermissions, "user:create": true, "user:read_all_org": true, "user:update_any_in_org": true, "user:delete_any_in_org": true, "user_roles:manage": true, "user:password_update_any_in_org": true, "team:create": true, "team:read_all_org": true, "team:update_any_in_org": true, "team:delete_any_in_org": true, "team:manage_members_any_in_org": true, "routing_rules:manage": true, "reports:view_all_org": true, "settings:manage_org_general": true };
        const adminWithBillingPermissions = { ...adminBasePermissions, "billing:view": true, "billing:manage": true };

        const rolesToCreate = [
          { name: "Owner", description: "Full control.", permissions: ownerPermissions, isSystemRole: true },
          { name: "Admin", description: "Admin access.", permissions: adminBasePermissions, isSystemRole: true },
          { name: "Admin with Billing", description: "Admin + Billing.", permissions: adminWithBillingPermissions, isSystemRole: true },
          { name: "Agent", description: "Agent access.", permissions: agentPermissions, isSystemRole: true },
        ];
        
        const createdRolesMap = new Map();
        for (const roleData of rolesToCreate) {
          const [createdRole] = await sqlTx`
            INSERT INTO "Role" (name, description, permissions, "isSystemRole", "organizationId", "createdAt", "updatedAt") 
            VALUES (${roleData.name}, ${roleData.description || null}, ${sqlTx.json(roleData.permissions)}, ${roleData.isSystemRole}, ${organizationId}, NOW(), NOW()) 
            RETURNING id, name, permissions`;
          if (!createdRole || !createdRole.id) throw new Error(`Failed to create role: ${roleData.name}`);
          createdRolesMap.set(roleData.name, createdRole);
          console.log(`SERVICE: Role '${createdRole.name}' (ID: ${createdRole.id}) created for Org ID ${organizationId}`);
        }
        const ownerRoleFromMap = createdRolesMap.get("Owner");
        if (!ownerRoleFromMap) throw new ApiError(500, "Critical error: Owner role was not found after creation.");

        // STEP 3: Create Owner User
        const [ownerUser] = await sqlTx`
          INSERT INTO "User" 
            ("firstName", "lastName", "fullName", email, "hashedPassword", 
             "isActiveAccount", "isEmailVerified", "organizationId", "jobTitle", 
             "agentStatusAfterLogin", "joinedDate", "createdAt", "updatedAt") 
          VALUES 
            (${ownerFirstName}, ${ownerLastName}, ${`${ownerFirstName} ${ownerLastName}`}, ${ownerEmail.toLowerCase()}, ${hashedPassword}, 
             ${true}, ${true}, ${organizationId}, ${"Owner"}, 
             ${'online'}, NOW(), NOW(), NOW()) 
          RETURNING *`;
        if (!ownerUser || !ownerUser.id) throw new Error("Failed to create owner user or retrieve its ID.");
        console.log(`SERVICE: Owner user created: ${ownerUser.email} (ID: ${ownerUser.id})`);

        // STEP 4: Assign Owner Role to User
        // Assuming implicit M2M table "_UserRoles" with A -> Role.id, B -> User.id
        console.log(`SERVICE: Attempting to link Role ID ${ownerRoleFromMap.id} to User ID ${ownerUser.id} in _UserRoles`);
        const linkResult = await sqlTx`
          INSERT INTO "_UserRoles" ("A", "B") 
          VALUES (${ownerRoleFromMap.id}, ${ownerUser.id})
          ON CONFLICT DO NOTHING`; // Add ON CONFLICT in case the link somehow already exists (defensive)
        console.log(`SERVICE: Role link result (row count for insert): ${linkResult.count}`);


        // STEP 5: Create General Team
        const [generalTeam] = await sqlTx`
          INSERT INTO "Team" (name, description, "isGeneralTeam", "organizationId", "leadUserId", "createdAt", "updatedAt")
          VALUES (${"General"}, ${`All users in ${newOrganization.name} organization.`}, ${true}, ${organizationId}, ${ownerUser.id}, NOW(), NOW())
          RETURNING id, name`;
        if (!generalTeam || !generalTeam.id) throw new Error("Failed to create general team or retrieve its ID.");
        console.log(`SERVICE: General Team created (ID: ${generalTeam.id})`);

        // STEP 6: Add Owner to General Team
        await sqlTx`
          INSERT INTO "UserTeamMembership" ("userId", "teamId", "priorityLevel", "assignedAt")
          VALUES (${ownerUser.id}, ${generalTeam.id}, ${1}, NOW())
          ON CONFLICT DO NOTHING`; // Add ON CONFLICT for robustness
        console.log(`SERVICE: Owner added to General Team`);

        // STEP 7: Prepare response data
        // Fetch the fully constituted user object for the response.
        // This query is complex to mimic Prisma's include for roles.
        // It assumes _UserRoles has A pointing to Role(id) and B pointing to User(id).
        const [finalUserWithDetails] = await sqlTx`
            SELECT u.*,
                   o.name as "organizationName",
                   COALESCE(
                       (SELECT json_agg(json_build_object('id', r.id, 'name', r.name, 'permissions', r.permissions))
                        FROM "_UserRoles" ur_join
                        JOIN "Role" r ON r.id = ur_join."A"
                        WHERE ur_join."B" = u.id),
                       '[]'::json
                   ) AS roles_agg
            FROM "User" u
            LEFT JOIN "Organization" o ON o.id = u."organizationId"
            WHERE u.id = ${ownerUser.id}
            GROUP BY u.id, o.id, o.name`; // Group by all selected non-aggregated columns

        if (!finalUserWithDetails) {
          throw new ApiError(500, "Failed to retrieve newly created owner details with relations.");
        }
        
        // Map roles_agg to user.roles
        const mappedUser = {
            ...finalUserWithDetails,
            roles: finalUserWithDetails.roles_agg.map(r => ({...r, permissions: r.permissions})), // postgres.js parses JSONB
            organization: { id: newOrganization.id, name: newOrganization.name } // newOrganization is already correct
        };
        delete mappedUser.roles_agg;
        delete mappedUser.hashedPassword;
        if (mappedUser && mappedUser.organizationId !== undefined) {
    const installedModules = await getInstalledModulesForOrganization(mappedUser.organizationId);
    mappedUser.installedModules = installedModules || [];
    console.log(`AUTH_SERVICE (getProfileData): Attached ${mappedUser.installedModules.length} modules for org ${mappedUser.organizationId}`);
} else {
    mappedUser.installedModules = [];
     console.log(`AUTH_SERVICE (getProfileData): No organizationId on mappedUser. Setting empty installedModules.`);
}

        console.log("SERVICE: Transaction completed successfully.");
        return { user: mappedUser, organization: newOrganization };
      });

      return result;

    } catch (error) {
      console.error("AuthServiceSQL Error in registerOwnerAndOrganization:", error.message, error.code ? `(Code: ${error.code})` : '', error.detail ? `Detail: ${error.detail}` : '');
      // Log the full error if it's not an ApiError already for more context
      if (!(error instanceof ApiError)) console.error(error);

      if (error.code === '23505') { // PostgreSQL unique violation
        if (error.constraint && error.constraint.toLowerCase().includes('organization_name_key')) {
          throw new ApiError(409, `Organization name "${organizationName}" already exists.`);
        }
        if (error.constraint && error.constraint.toLowerCase().includes('user_email_key')) {
          throw new ApiError(409, `Email "${ownerEmail}" is already registered.`);
        }
        throw new ApiError(409, "A unique constraint was violated during registration.");
      }
      if (error.code === '42P01') { // PostgreSQL undefined_table
          throw new ApiError(500, "Database schema error: A required table was not found. Please check migrations.");
      }
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Organization registration failed due to a server error.");
    }
  }

  generateToken(user) {
    if (!process.env.JWT_SECRET) {
        console.error("FATAL: JWT_SECRET is not defined.");
        throw new ApiError(500, "Auth config error.");
    }
    const payload = { sub: user.id, orgId: user.organizationId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  }

  
 async loginUser({ email, password }) {
    console.log(`AUTH_SERVICE (loginUser): Attempt for ${email}`);
    const users = await sql`
      SELECT u.*, o.id AS "organization.id", o.name AS "organization.name",
        COALESCE((SELECT json_agg(json_build_object('id', r.id, 'name', r.name, 'permissions', r.permissions))
                   FROM "_UserRoles" ur_join JOIN "Role" r ON r.id = ur_join."A"
                   WHERE ur_join."B" = u.id), '[]'::json) AS roles_json_agg
      FROM "User" u
      LEFT JOIN "Organization" o ON o.id = u."organizationId"
      WHERE u.email = ${email.toLowerCase()}
      GROUP BY u.id, o.id, o.name;`;
        console.log("CRITICAL: organizationId is missing from userCoreFields in mapDbUserToUserObject. User object:");

    if (!users || users.length === 0) throw new ApiError(401, 'Invalid email or password.');
    const userFromDbRow = users[0];

    if (!userFromDbRow.hashedPassword) throw new ApiError(401, 'Account not fully activated or password not set.');
    const isPasswordValid = await bcrypt.compare(password, userFromDbRow.hashedPassword);
    if (!isPasswordValid) throw new ApiError(401, 'Invalid email or password.');
    if (!userFromDbRow.isActiveAccount) throw new ApiError(403, 'Login failed: Account is inactive.');
    if (userFromDbRow.isBanned) throw new ApiError(403, 'Login failed: Account is banned.');
    
    await sql`UPDATE "User" SET "lastLoginAt" = NOW() WHERE id = ${userFromDbRow.id}`;
    
    const userToReturn = mapDbUserToUserObject(userFromDbRow);
    if (!userToReturn) throw new ApiError(500, 'Failed to process user data after login.');

    // Fetch and attach installed modules
    if (userToReturn.organizationId !== undefined && userToReturn.organizationId !== null) {
        console.log(`AUTH_SERVICE (loginUser): Fetching modules for orgId: ${userToReturn.organizationId}`);
        const installedModulesForOrg = await getInstalledModulesForOrganization(userToReturn.organizationId);
        userToReturn.installedModules = installedModulesForOrg || [];
        console.log(`AUTH_SERVICE (loginUser): Attached ${userToReturn.installedModules.length} modules for org ${userToReturn.organizationId}:`, userToReturn.installedModules.map(m=>m.id));
    } else {
        userToReturn.installedModules = [];
        console.warn(`AUTH_SERVICE (loginUser): No valid organizationId on user ${userToReturn.id}. installedModules set to [].`);
    }
    
    console.log(`AUTH_SERVICE (loginUser): Final user object for response:`, JSON.stringify(userToReturn, null, 2).substring(0, 500) + "..."); // Log snippet
    return userToReturn;
  }

  async getProfileData(userId) {
    if (!userId) throw new ApiError(400, "User ID is required to fetch profile data.");
    console.log(`AUTH_SERVICE (getProfileData): Fetching profile for userId: ${userId}`);

    const [userFromDbRow] = await sql`
        SELECT u.*, o.name AS "organizationName", o.id AS "organizationDataId",
               COALESCE((SELECT json_agg(json_build_object('id', r.id, 'name', r.name, 'permissions', r.permissions))
                         FROM "_UserRoles" ur_join JOIN "Role" r ON r.id = ur_join."A"
                         WHERE ur_join."B" = u.id), '[]'::json) AS roles_json_agg
        FROM "User" u
        LEFT JOIN "Organization" o ON o.id = u."organizationId"
        WHERE u.id = ${userId}
        GROUP BY u.id, o.id, o.name;`;

    if (!userFromDbRow) {
      console.log(`AUTH_SERVICE (getProfileData): User ${userId} not found.`);
      return null;
    }
    
    const mappedUser = mapDbUserToUserObject(userFromDbRow);
    if (!mappedUser) throw new ApiError(500, 'Failed to process user data for profile.');

    // Fetch and attach installed modules
    if (mappedUser.organizationId !== undefined && mappedUser.organizationId !== null) {
        console.log(`AUTH_SERVICE (getProfileData): Fetching modules for orgId: ${mappedUser.organizationId}`);
        const installedModulesForOrg = await getInstalledModulesForOrganization(mappedUser.organizationId);
        mappedUser.installedModules = installedModulesForOrg || [];
        console.log(`AUTH_SERVICE (getProfileData): Attached ${mappedUser.installedModules.length} modules for org ${mappedUser.organizationId}:`, mappedUser.installedModules.map(m=>m.id));
    } else {
        mappedUser.installedModules = [];
        console.warn(`AUTH_SERVICE (getProfileData): No valid organizationId on user ${mappedUser.id}. installedModules set to [].`);
    }

    console.log(`AUTH_SERVICE (getProfileData): Final profile for ${userId}:`, JSON.stringify(mappedUser, null, 2).substring(0, 500) + "...");
    return mappedUser;
  }



  generateToken(user) {
    // ... (same as your working version)
    if (!process.env.JWT_SECRET) throw new ApiError(500, "JWT Secret not configured.");
    const payload = { sub: user.id, orgId: user.organizationId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  }


    async forgotPasswordService(email) {
    console.log(`SERVICE: forgotPasswordService for ${email}`);
    const [user] = await sql`SELECT id, email, "fullName" FROM "User" WHERE email = ${email.toLowerCase()}`;

    if (!user) {
      console.warn(`SERVICE: Password reset request for non-existent email: ${email}`);
      return { message: "If an account with that email exists, a password reset link has been sent." };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    await sql`
      UPDATE "User" 
      SET "passwordResetToken" = ${resetToken}, "passwordResetExpires" = ${resetTokenExpires} 
      WHERE id = ${user.id}
    `;

    // TODO: Call your actual email sending utility (e.g., using Resend)
    // import { sendPasswordResetEmail } from '../utils/emailSender.js';
    // const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    // await sendPasswordResetEmail(user.email, user.fullName, resetLink);
    console.log(`SERVICE (DEV): Password Reset for ${user.email}, Token: ${resetToken}`);
    
    return { message: "If an account with that email exists, a password reset link has been sent." };
  }

  async resetPasswordService({ token, password, firstName, lastName }) { // Destructure from object
    console.log(`SERVICE: resetPasswordService for token: ${token}`);
    const [user] = await sql`
      SELECT * FROM "User" 
      WHERE "passwordResetToken" = ${token} AND "passwordResetExpires" > NOW()
    `;

    if (!user) {
      throw new ApiError(400, "Password reset token is invalid or has expired.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateData = {
      hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
      lastPasswordChangeAt: new Date(),
      isActiveAccount: true, // Often, reset implies account activation
      isEmailVerified: true, // And email verification
    };
    // Conditionally update names if provided
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (firstName && lastName) updateData.fullName = `${firstName} ${lastName}`;
    else if (firstName && user.lastName) updateData.fullName = `${firstName} ${user.lastName}`;
    else if (lastName && user.firstName) updateData.fullName = `${user.firstName} ${lastName}`;

    const [updatedUser] = await sql`
      UPDATE "User" 
      SET ${sql(updateData)} -- postgres.js helper for dynamic SET
      WHERE id = ${user.id}
      RETURNING *`; // Return the updated user

    console.log(`SERVICE: Password reset for user ${updatedUser.email}`);
    return mapDbUserToUserObject(updatedUser);
  }

  async acceptInvitationService({ token, password, firstName, lastName }) {
    console.log(`SERVICE: acceptInvitationService for token: ${token}`);
    const [user] = await sql`
        SELECT * FROM "User"
        WHERE "invitationToken" = ${token} AND "invitationExpires" > NOW()
    `;

    if (!user) {
        throw new ApiError(400, "Invalid or expired invitation token.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateData = {
        hashedPassword,
        isActiveAccount: true,
        isEmailVerified: true,
        joinedDate: new Date(),
        invitationToken: null,
        invitationExpires: null,
        lastPasswordChangeAt: new Date() // Good to set this too
    };

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;

    // Construct fullName carefully based on provided names and existing ones if any
    let finalFullName = user.fullName;
    if (firstName && lastName) {
        finalFullName = `${firstName} ${lastName}`;
    } else if (firstName) {
        finalFullName = `${firstName} ${user.lastName || ''}`.trim();
    } else if (lastName) {
        finalFullName = `${user.firstName || ''} ${lastName}`.trim();
    }
    if (finalFullName !== user.fullName) { // Only update fullName if it actually changed
        updateData.fullName = finalFullName;
    }
    
    const [updatedUser] = await sql`
        UPDATE "User"
        SET ${sql(updateData)}
        WHERE id = ${user.id}
        RETURNING *`; // Return all fields to be sanitized

    console.log(`SERVICE: User ${updatedUser.email} accepted invitation and set password.`);
    return mapDbUserToUserObject(updatedUser); // Use helper to sanitize
  }


  
}

 
export default new AuthService();
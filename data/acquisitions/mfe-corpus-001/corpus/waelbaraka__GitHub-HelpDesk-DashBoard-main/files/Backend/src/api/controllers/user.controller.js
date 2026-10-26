// src/api/controllers/user.controller.js
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto'; // For generating invitation tokens
import bcrypt from 'bcryptjs';

import { 
    inviteUser as inviteUserService,
    acceptInvitation as acceptInvitationService ,
        bulkInviteUsers as bulkInviteUsersService ,
        getUserTeams

} from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js'; // Assuming you have this

import * as userService from '../services/user.service.js'; // Assuming named exports from service

const prisma = new PrismaClient();

export const getProfile = (req, res) => {
  const { hashedPassword, ...profileData } = req.user;
  res.json({ message: "Profile data retrieved!", profile: profileData });
};

const sanitizeUser = (user) => {
  if (!user) return null;
  // eslint-disable-next-line no-unused-vars
  const { hashedPassword, invitationToken, passwordResetToken, passwordResetExpires, invitationExpires, twoFactorSecret, ...sanitized } = user;
  return sanitized;
};


// GET /api/users
export const listUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        organizationId: req.user.organizationId, // Filter by the admin's own organization
      },
      select: { // Select only non-sensitive fields
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        jobTitle: true,
        isActiveAccount: true,
        roles: { select: { id: true, name: true } }
      }
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// POST /api/users/invite
export const inviteUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName, roleIds } = req.body;
    const organizationId = req.user.organizationId;
    
    // ... validation ...
    if (!email || !firstName || !lastName || !roleIds || !roleIds.length) {
        return res.status(400).json({ message: "Email, name, and at least one role ID are required." });
    }
    const existingUser = await prisma.user.findFirst({ where: { email, organizationId } });
    if (existingUser) {
      return res.status(409).json({ message: "A user with this email already exists in this organization." });
    }

  const newUser = await tx.user.create({
  data: {
    email: email.toLowerCase(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    organizationId,
    invitationToken: invitationTokenInternal, // Use the locally generated token
    invitationExpires: invitationExpiresInternal,
    invitedByUserId,
    isActiveAccount: false,
    isEmailVerified: false,
    agentStatusAfterLogin: 'offline',
    roles: { connect: roleIds.map(id => ({ id })) },
  },
  // --- ADD OR VERIFY THIS SELECT CLAUSE ---
  select: {
    id: true,
    email: true,         // Ensure email is selected
    fullName: true,      // Ensure fullName is selected
    firstName: true,     // Optional, but good if recipientName uses it
    lastName: true,      // Optional
    invitationToken: true // CRITICAL: Ensure invitationToken is selected
  }
  // --- END SELECT CLAUSE ---
});

    // Ensure these variables are correctly passed
    const recipientEmail = newUser.email;
    const recipientName = `${newUser.firstName} ${newUser.lastName}`;
    const invitationToken = newUser.invitationToken;
    const organizationName = req.user.organizationName; // Ensure this is correctly defined

    sendInvitationEmail(recipientEmail, recipientName, invitationToken, organizationName);

    console.log(`Invitation token for ${email}: ${newUser.invitationToken}`);
    res.status(201).json({ message: "Invitation sent successfully.", userId: newUser.id });

  } catch (error) {
    console.error("Invite User Controller Error:", error.message);
    res.status(400).json({ message: error.message || "An error occurred during invitation." });
  }
};

export const bulkInviteUsers = async (req, res, next) => {
  try {
    // 1. Expect an array of users in the request body
    const { usersToInvite } = req.body;
    const organizationId = req.user.organizationId;
    const invitedByUserId = req.user.id;

    // 2. Basic validation
    if (!usersToInvite || !Array.isArray(usersToInvite) || usersToInvite.length === 0) {
      return res.status(400).json({ message: "Request must include a non-empty array of users to invite." });
    }

    // 3. Call the new bulk service function
    const result = await bulkInviteUsersService({
      usersToInvite,
      organizationId,
      invitedByUserId
    });

    // TODO: Loop through result.createdUsers to send emails

    res.status(201).json({
      message: "Bulk invitation process completed.",
      ...result // This will contain 'createdUsers' and 'failedInvites'
    });

  } catch (error) {
    console.error("Bulk Invite Controller Error:", error);
    // This will catch critical errors like invalid role/team IDs passed for all users
    res.status(400).json({ message: error.message || "An error occurred during the bulk invitation process." });
  }
};

// POST /api/users/accept-invitation
export const acceptInvitation = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required." });
    }
    if (password.length < 1) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    await acceptInvitationService({ token, password });

    res.status(200).json({ message: "Account activated successfully. You can now log in." });

  } catch (error) {
    // This will catch the "Invalid or expired token" error from the service
    res.status(400).json({ message: error.message });
  }
};



/**
 * @desc    Get a single user by ID
 * @route   GET /api/users/:id
 * @access  Private (requires 'user_read' permission)
 */
export const getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        organizationId: req.user.organizationId, // Security: Ensure user is in the admin's org
      },
      select: { // Exclude sensitive fields
        id: true, email: true, firstName: true, lastName: true, fullName: true,
        jobTitle: true, isActiveAccount: true, joinedDate: true,
        roles: { select: { id: true, name: true } },
        teamMemberships: { select: { team: { select: { id: true, name: true } } } }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};



/**
 * @desc    Update a user's details, roles, or status
 * @route   PATCH /api/users/:id
 * @access  Private (requires 'user_update' permission)
 */
export const updateUser = async (req, res, next) => {
  try {
    const userIdToUpdate = parseInt(req.params.id);
    const { firstName, lastName, jobTitle, isActiveAccount, roleIds } = req.body;

    // Ensure admin is not accidentally updating themselves via this endpoint
    if (userIdToUpdate === req.user.id) {
        return res.status(400).json({ message: "Cannot update your own profile via this endpoint. Please use /api/auth/profile." });
    }
    
    // Find the user to ensure they exist in the admin's organization
    const userToUpdate = await prisma.user.findFirst({
        where: { id: userIdToUpdate, organizationId: req.user.organizationId }
    });

    if (!userToUpdate) {
        return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userIdToUpdate },
      data: {
        firstName,
        lastName,
        fullName: (firstName && lastName) ? `${firstName} ${lastName}` : undefined,
        jobTitle,
        isActiveAccount,
        roles: roleIds ? { set: roleIds.map(id => ({ id: parseInt(id) })) } : undefined,
      },
    });

    res.status(200).json({ message: "User updated successfully.", userId: updatedUser.id });
  } catch (error) {
    next(error);
  }
};




export const bulkInviteUsersController = async (req, res, next) => {
  try {
    const { usersToInvite } = req.body; // Expects an array of user objects
    if (!Array.isArray(usersToInvite) || usersToInvite.length === 0) {
      throw new ApiError(400, "An array of 'usersToInvite' is required.");
    }
    // TODO: Add validation for each user object in the array

    const result = await userService.bulkInviteUsersService({
      usersToInvite,
      organizationId: req.user.organizationId,
      invitedByUserId: req.user.id,
    });

    // TODO: Implement sending emails for each createdUser.invitationToken
    console.log(`BULK INVITATION: Send emails for tokens:`, result.createdUsers.map(u => ({email: u.email, token: u.invitationToken})));

    res.status(201).json({
      message: "Bulk invitation process completed.",
      createdUsers: result.createdUsers.map(u => ({ email: u.email, userId: u.userId })), // Don't send tokens in response
      failedInvites: result.failedInvites,
    });
  } catch (error) {
    next(error);
  }
};

// Helper to sanitize user objects for response
const sanitizeUserForList = (user) => {
  if (!user) return null;
  // eslint-disable-next-line no-unused-vars
  const { hashedPassword, invitationToken, passwordResetToken, passwordResetExpires, invitationExpires, twoFactorSecret, permissionOverrides, deactivationDetails, ...sanitized } = user;
  return sanitized;
};


export const listUsersController = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId; // Get org ID from authenticated user
    
    // Extract pagination, sorting, filtering query parameters
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc', status, roleId, searchTerm } = req.query;

    const queryOptions = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
      filters: {
        ...(status && { isActiveAccount: status === 'active' || status === 'true' }), // Example filter by status
        ...(roleId && { roleId: parseInt(roleId) }), // Example filter by role
        ...(searchTerm && { searchTerm }), // Example search term
      }
    };

    const result = await userService.listUsersService(organizationId, queryOptions);
    
    res.json({
      users: result.users.map(sanitizeUserForList),
      totalUsers: result.totalUsers,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });

  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      throw new ApiError(400, "Invalid user ID format.");
    }
    // TODO: Add permission check if user can view THIS specific user (e.g., same org)
    const user = await userService.getUserByIdService(userId, req.user.organizationId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    res.json(sanitizeUser(user));
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const userIdToUpdate = parseInt(req.params.userId);
    const updateData = req.body; // e.g., { roleIds: [...], isActiveAccount: false }
    
    if (isNaN(userIdToUpdate)) {
      throw new ApiError(400, "Invalid user ID format.");
    }

    // TODO: Add more robust validation for updateData
    // TODO: Ensure admin updating user is within the same org or has super admin rights

    const updatedUser = await userService.updateUserService(userIdToUpdate, updateData, req.user.organizationId);
    if (!updatedUser) {
        throw new ApiError(404, "User not found or update failed.");
    }
    res.json(sanitizeUser(updatedUser));
  } catch (error) {
    next(error);
  }
};


// ... existing code ...

export const inviteUserController = async (req, res, next) => {
  try {
    // Now expects roleName instead of roleIds from the request body
    const { email, firstName, lastName, roleName } = req.body; 
    const invitingUser = req.user; // Authenticated user performing the invite

    // Validation
    if (!email || !firstName || !lastName || !roleName) {
      throw new ApiError(400, "Email, firstName, lastName, and roleName are required for invitation.");
    }
    if (typeof roleName !== 'string' || roleName.trim() === '') {
        throw new ApiError(400, "roleName must be a non-empty string.");
    }

    // --- Look up Role ID by roleName and organizationId ---
    const roleToAssign = await prisma.role.findUnique({
      where: {
        organizationId_name: { // Using the @@unique([organizationId, name]) constraint
          organizationId: invitingUser.organizationId,
          name: roleName,
        }
      },
      select: { id: true } // Only need the ID
    });

    if (!roleToAssign) {
      throw new ApiError(400, `Role '${roleName}' not found or is invalid for your organization.`);
    }
    // --- End Role ID Lookup ---

    // Ensure email is a string
    const invitationDetails = {
      email: email.toLowerCase(), // Ensure email is a string
      firstName,
      lastName,
      roleIds: [roleToAssign.id], // Pass the looked-up role ID as an array
      organizationId: invitingUser.organizationId,
      invitedByUserId: invitingUser.id,
    };

    const invitedUserResponse = await inviteUserService(invitationDetails);
    
    // Email sending is handled within the service now
    
    res.status(201).json({ 
        message: invitedUserResponse.message, // Use message from service
        userId: invitedUserResponse.id, 
        email: invitedUserResponse.email
        // Do not send token in this API response; it's sent via email.
    });
  } catch (error) {
    // Catch specific errors for better messages if needed
    if (error instanceof ApiError) {
        next(error);
    } else if (error.code === 'P2002' && error.meta?.target?.includes('email')) { // Prisma unique constraint on email
        next(new ApiError(409, `A user with email ${req.body.email} already exists.`));
    }
    else {
        console.error("Invite User Controller Error:", error);
        next(new ApiError(500, error.message || "Failed to send invitation."));
    }
  }
};

// ... existing code ...
export const getAgentStatusPolicyController = async (req, res, next) => {
  try {
    // If getting status for a specific agent by ID (e.g., supervisor view)
    // const userId = parseInt(req.params.agentId); 
    // if (isNaN(userId)) throw new ApiError(400, "Invalid agent ID.");

    // If agent gets their own status policy
    const userId = req.user.id; 

    const statusPolicy = await userService.getAgentStatusPolicyService(userId, req.user.organizationId);
    res.json(statusPolicy);
  } catch (error) {
    next(error);
  }
};

// --- NEW CONTROLLER: Update Agent Status Policy ---
export const updateAgentStatusPolicyController = async (req, res, next) => {
  try {
    // If supervisor updates an agent's status policy:
    // const userIdToUpdate = parseInt(req.params.agentId);
    // const { agentStatusAfterLogin } = req.body;
    // if (isNaN(userIdToUpdate)) throw new ApiError(400, "Invalid agent ID.");

    // If agent updates their own status policy (e.g., from their profile page)
    const userIdToUpdate = req.user.id; 
    const { agentStatusAfterLogin } = req.body; // Expects: { "agentStatusAfterLogin": "new_status" }

    if (!agentStatusAfterLogin) {
      throw new ApiError(400, "agentStatusAfterLogin is required.");
    }

    const updatedStatusInfo = await userService.updateAgentStatusPolicyService(
        userIdToUpdate, 
        agentStatusAfterLogin,
        req.user.organizationId
    );
    res.json(updatedStatusInfo);
  } catch (error) {
    next(error);
  }
};


export const updateUserProfileController = async (req, res, next) => {
  try {
    const userIdToUpdate = parseInt(req.params.userId);
    const dataToUpdate = req.body;

    if (isNaN(userIdToUpdate)) {
      throw new ApiError(400, "Invalid user ID provided in URL.");
    }

    // Example Permission Check: User can update their own profile, or an admin can.
    const isOwnProfile = req.user.id === userIdToUpdate;
    const isAdminWithPermission = req.user.isAdmin || (req.user.permissions && req.user.permissions.includes('user_update')); // Adjust permission check as needed

    if (!isOwnProfile && !isAdminWithPermission) {
      throw new ApiError(403, "Forbidden: You do not have permission to update this user's profile.");
    }
    
    // Validation for workingHours structure (same as before)
    if (dataToUpdate.hasOwnProperty('workingHours')) {
        if (dataToUpdate.workingHours !== null && !Array.isArray(dataToUpdate.workingHours)) {
             return res.status(400).json({ message: "workingHours must be an array or null." });
        }
        if (Array.isArray(dataToUpdate.workingHours)) {
            for (const day of dataToUpdate.workingHours) {
                if (typeof day.day !== 'string' || typeof day.enabled !== 'boolean' || !Array.isArray(day.slots)) {
                    return res.status(400).json({ message: `Invalid structure for a day object in workingHours (day: ${day.day}).` });
                }
                for (const slot of day.slots) {
                    if (typeof slot.start !== 'string' || !/^\d{2}:\d{2}$/.test(slot.start) ||
                        typeof slot.end !== 'string' || !/^\d{2}:\d{2}$/.test(slot.end) ) {
                         return res.status(400).json({ message: `Invalid time format in workingHours slot for day ${day.day}. Expected HH:MM.` });
                    }
                }
            }
        }
    }
    // agentStatusAfterLogin should be handled by its own controller/service as per previous design.
    // If it's sent here, the service should ignore it.
    if (dataToUpdate.hasOwnProperty('agentStatusAfterLogin')) {
        console.warn("updateUserProfileController received agentStatusAfterLogin; this should be updated via its dedicated endpoint.");
        delete dataToUpdate.agentStatusAfterLogin; // Remove it so profile service doesn't try to update it
    }


    const updatedUser = await userService.updateUserProfileService(
      userIdToUpdate,
      dataToUpdate,
      req.user.organizationId // Pass requesting user's org ID for security checks in service
    );
    
    // --- FIX IS HERE ---
    res.json(sanitizeUser(updatedUser)); // Use the correct function name: sanitizeUser

  } catch (error) {
    next(error);
  }
};
// ... other controllers that might also use sanitizeUser ...
export const getProfileController = async (req, res, next) => {
  try {
    const userProfile = await userService.getProfileService(req.user.id); 
    if (!userProfile) {
      throw new ApiError(404, "Profile not found.");
    }
    res.json(sanitizeUser(userProfile)); // <<<< Example of correct usage
  } catch (error) {
    next(error);
  }
};


export const changeUserRoleController = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user.id; // ID of the user making the request
    const authenticatedUserRoles = req.user.roles.map(r => r.name); // Names of roles of the requester
    const organizationId = req.user.organizationId;

    const userIdToChange = parseInt(req.params.userIdToChange);
    const { newRoleName } = req.body; // Expecting role name like "Admin", "Agent"

    if (isNaN(userIdToChange)) {
      throw new ApiError(400, "Invalid target user ID format.");
    }
    if (!newRoleName) {
      throw new ApiError(400, "New role name is required.");
    }
    const validRoles = ["Owner", "Admin", "Admin with Billing", "Agent"];
    if (!validRoles.includes(newRoleName)) {
        throw new ApiError(400, "Invalid new role name provided.");
    }

    const updatedUser = await userService.changeUserRoleService({
      authenticatedUserId,
      authenticatedUserRoles,
      organizationId,
      userIdToChange,
      newRoleName,
    });

    const sanitizeUser = (user) => { /* ... your sanitize function ... */ return user; };
    res.json(sanitizeUser(updatedUser));

  } catch (error) {
    next(error);
  }
};
 


export const adminChangeUserPasswordController = async (req, res, next) => {
  try {
    const adminUserId = req.user.id; // ID of the admin making the request
    const adminOrganizationId = req.user.organizationId;

    const userIdToChange = parseInt(req.params.userIdToChange);
    const { newPassword } = req.body;

    if (isNaN(userIdToChange)) {
      throw new ApiError(400, "Invalid target user ID format.");
    }
    if (!newPassword) {
      throw new ApiError(400, "New password is required.");
    }
    if (newPassword.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long.");
    }
    if (adminUserId === userIdToChange) {
        throw new ApiError(400, "Admins should use the 'change own password' feature for their own account.");
    }

    await userService.adminChangeUserPasswordService(
        userIdToChange, 
        newPassword, 
        adminOrganizationId // Pass admin's org ID for validation
    );

    res.json({ message: `Password for user ID ${userIdToChange} changed successfully.` });
  } catch (error) {
    next(error);
  }
};




export const changeUserPasswordController = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user.id;
    const authenticatedUserOrganizationId = req.user.organizationId;
    // effectivePermissions might be on req.user if your isAuthenticated middleware adds it
    const authenticatedUserPermissions = req.user.effectivePermissions || new Set(); 

    const targetUserId = parseInt(req.params.userIdToChange);
    const { newPassword } = req.body;

    if (isNaN(targetUserId)) {
      throw new ApiError(400, "Invalid target user ID format.");
    }
    if (!newPassword) {
      throw new ApiError(400, "New password is required.");
    }
    if (newPassword.length < 8) { // Example password policy
      throw new ApiError(400, "Password must be at least 8 characters long.");
    }

    // The service will handle more detailed permission logic
    await userService.changeUserPasswordService({
        authenticatedUserId,
        authenticatedUserPermissions, // Pass permissions for finer-grained checks
        authenticatedUserOrganizationId,
        targetUserId,
        newPassword,
    });

    res.json({ message: `Password for user ID ${targetUserId} changed successfully.` });
  } catch (error) {
    next(error);
  }
};



export const listUserTeams = async (req, res, next) => {
  console.log(`%c[CONTROLLER] Handling GET /api/users/${req.params.userId}/teams`, 'color: purple;');
  try {
    const { userId } = req.params;
    const teams = await getUserTeams(parseInt(userId, 10));
    console.log(`%c[CONTROLLER] getUserTeams service returned ${teams.length} teams. Responding with 200 OK.`, 'color: green;');
    res.status(200).json(teams);
  } catch (error) {
    console.error("[CONTROLLER ERROR] listUserTeams failed.");
    next(error);
  }
};








export default {
 acceptInvitation,
 inviteUser,
 listUsers, 
 updateUser,
 getUserById,
 bulkInviteUsers,
 getProfile,
bulkInviteUsersController,
getProfileController,
inviteUserController,
updateUserController,
getUserByIdController,
listUsersController,
getAgentStatusPolicyController,
updateAgentStatusPolicyController,
changeUserRoleController,
adminChangeUserPasswordController,
listUserTeams,
}

// Add getUserById and updateUser controller functions here later...
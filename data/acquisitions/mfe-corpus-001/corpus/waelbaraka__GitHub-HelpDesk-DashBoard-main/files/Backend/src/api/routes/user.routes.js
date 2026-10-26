// src/api/routes/user.routes.js
import express from 'express';
// Assuming your controller functions are exported individually:
import {
    getProfileController, // Renamed for clarity, assuming you have a controller for this
    listUsersController,
    inviteUserController,
    getUserByIdController,
    updateUserController, // For general user updates by admin
    bulkInviteUsersController,
    updateUserProfileController,
    getAgentStatusPolicyController,    // <-- NEW
    updateAgentStatusPolicyController,
    changeUserRoleController,
    adminChangeUserPasswordController,
    changeUserPasswordController,
    listUserTeams,
} from '../controllers/user.controller.js'; // YOU NEED TO CREATE/ADJUST THIS CONTROLLER FILE

import hasPermission from '../middlewares/hasPermission.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Use this for JWT authentication

const router = express.Router();

// GET /api/users - List all users in the organization
// router.get('/', isAuthenticated, hasPermission(['user_read']), listUsersController); // Added isAuthenticated


router.get(
    '/',
    isAuthenticated,
    hasPermission(['user:read_all_org', 'user:manage']), // Example permissions
    listUsersController
);


// GET /api/users/profile - Get the profile of the currently authenticated user
// This usually doesn't take an ID from the path but uses req.user from isAuthenticated
router.get('/profile', isAuthenticated, getProfileController); // Removed hasPermission if it's for "own" profile

// POST /api/users/invite - Invite a new user
router.post(
  '/invite',
  isAuthenticated,
  hasPermission('user:create'), // Or 'user_manage' or similar
  inviteUserController
);

// POST /api/users/bulk-invite - Invite multiple users
router.post('/bulk-invite', isAuthenticated, hasPermission('user:create'), bulkInviteUsersController);

// POST /api/users/accept-invitation - Public route for invited user to accept
// router.post('/accept-invitation', acceptInvitationController);


// --- Routes for specific user by ID (typically admin actions) ---

// GET /api/users/:userId - Get a specific user by ID
router.get('/:userId', isAuthenticated, hasPermission(['user_read']), getUserByIdController);

// PATCH /api/users/:userId - Update a user's details (e.g., roles, status by an admin)
router.patch('/:userId', isAuthenticated, hasPermission(['user_update']), updateUserController);


// If it's for the user updating their *own* profile, the route might be /api/users/profile (PUT)
// and userId would come from req.user.id. For now, assuming an admin can update any user's profile.
router.put('/:userId/profile', isAuthenticated, hasPermission(['user_update_profile', 'user_update']), updateUserProfileController);

 router.get('/:agentId/status-policy', isAuthenticated, getAgentStatusPolicyController);

 // Or if a supervisor gets another agent's status policy:
// router.get('/:agentId/status-policy', isAuthenticated, hasPermission(['view_agent_status']), getAgentStatusPolicyController);


// PATCH /api/users/status-policy (for the authenticated user to update their own policy)
router.patch('/:agentId/status-policy', isAuthenticated, updateAgentStatusPolicyController);
// Or if a supervisor updates an agent's status policy:
// router.patch('/:agentId/status-policy', isAuthenticated, hasPermission(['edit_agent_status']), updateAgentStatusPolicyController);


// Existing route for general profile updates (now EXCLUDES agentStatusAfterLogin)
router.put('/:userId/profile', isAuthenticated, hasPermission(['user_update_profile', 'user_update']), updateUserProfileController);



router.get('/:userId/teams', listUserTeams);


// PATCH or PUT /api/users/:userIdToChange/role - Change a user's role
router.patch(
  '/:userIdToChange/role',
  isAuthenticated,
  hasPermission(['user_roles:manage']), // A general permission for role management
  changeUserRoleController
);



// PATCH /api/users/:userIdToChange/password - Admin changes another user's password
router.patch(
    '/:userIdToChange/password', // userIdToChange identifies the target user
    isAuthenticated,
    hasPermission(['user:manage_passwords', 'user:update']), // Specific permission for this admin action
    adminChangeUserPasswordController
);

router.patch(
    '/:userIdToChange/owner-password', 
    isAuthenticated,
    // A general permission that both self-changers and admins would have
    // Or, no specific permission string here if isAuthenticated is enough for self-change,
    // and admin capabilities are checked in the service.
    // For now, let's assume a permission that an admin would have.
    // If a regular user tries this with their own ID, the service will allow it.
    hasPermission(['user:update']), // Example - an admin might need this to target OTHERS.
                                   // Self-update is often implicitly allowed.
    changeUserPasswordController // Renamed for generality
);

export default router;
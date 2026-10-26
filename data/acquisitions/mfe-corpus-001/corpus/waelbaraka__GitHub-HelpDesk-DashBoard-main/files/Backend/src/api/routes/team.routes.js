import { Router } from 'express';
import teamController from '../controllers/team.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import hasPermission from '../middlewares/hasPermission.js';

const router = Router();

// --- Specific text-based routes first ---

// Search for teams by name (e.g., for an admin search bar)
// GET /api/teams/search?name=Cardio
router.get(
    '/search',
    isAuthenticated,
    hasPermission('team:read'),
    teamController.searchTeams
);

// Get all teams the current user is a member of
// GET /api/teams/my-teams
router.get(
    '/my-teams',
    isAuthenticated, // Any logged-in user can see their own teams
    teamController.getMyTeams
);


// --- General routes next ---

// Get a list of all teams in the organization (for admins)
// GET /api/teams
router.get(
    '/',
    isAuthenticated,
    hasPermission('team:read'),
    teamController.listTeamsController
);


router.post(
    '/',
    isAuthenticated,
    hasPermission(['team:create']), // User needs permission to create teams
    teamController.createTeamController
);
// --- Dynamic, parameterized routes last ---

// Get a single team by its ID
// GET /api/teams/4
router.get(
    '/:id',
    isAuthenticated,
    hasPermission('team:read'),
    teamController.getTeamById
);

// Update a team's details
// PATCH /api/teams/4
router.patch(
    '/:id',
    isAuthenticated,
    hasPermission('team:update'),
    teamController.updateTeam
);

// Delete a team
// DELETE /api/teams/4
router.delete(
    '/:id',
    isAuthenticated,
    hasPermission('team:delete'),
    teamController.deleteTeam
);

export default router;
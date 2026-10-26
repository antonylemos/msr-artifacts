import teamService from '../services/team.service.js';
import { ApiError } from '../utils/ApiError.js'; // Assuming you have this

// Handles GET /api/teams/search
const searchTeams = async (req, res, next) => {
    try {
        const organizationId = req.user.organizationId;
        const { name } = req.query;

        // Return empty array if no search term is provided, rather than all teams.
        if (!name) {
            return res.status(200).json([]);
        }

        const teams = await teamService.searchByName(organizationId, name);
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
};

// Handles GET /api/teams/my-teams
const getMyTeams = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const teams = await teamService.getTeamsForUser(userId);
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
};

// Handles GET /api/teams
export const listTeamsController = async (req, res, next) => {
    try {
        const organizationId = req.user.organizationId;
        
        // Destructure from req.query - they will be strings or undefined
        const { 
            page: pageStr = "1",    // Default to string "1"
            limit: limitStr = "20", // Default to string "20"
            searchTerm = '',
            sortBy = 'name',
            sortOrder = 'asc' 
        } = req.query;

        // --- CONVERT TO INTEGERS ---
        const page = parseInt(pageStr, 10);
        const limit = parseInt(limitStr, 10);

        // Basic validation for parsed numbers
        if (isNaN(page) || page < 1) {
            throw new ApiError(400, "Invalid 'page' parameter. Must be a positive integer.");
        }
        if (isNaN(limit) || limit < 1 || limit > 100) { // Example: max limit of 100
            throw new ApiError(400, "Invalid 'limit' parameter. Must be an integer between 1 and 100.");
        }
        // --- END CONVERSION ---

        const queryOptions = {
          page, // Now an integer
          limit, // Now an integer
          searchTerm,
          sortBy,
          sortOrder
        };

        const result = await teamService.listTeamsService(organizationId, queryOptions);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



export const createTeamController = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const creatorUserId = req.user.id; // ID of the authenticated user creating the team
    const organizationId = req.user.organizationId;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new ApiError(400, "Team name is required.");
    }
    // Description is optional

    const newTeam = await teamService.createTeamService({
      name: name.trim(),
      description: description ? description.trim() : null,
      organizationId,
      creatorUserId, // Pass the creator's ID to the service
    });

    res.status(201).json(newTeam);
  } catch (error) {
    next(error);
  }
};



// Handles GET /api/teams/:id
const getTeamById = async (req, res, next) => {
    try {
        const teamId = parseInt(req.params.id, 10);
        if (isNaN(teamId)) {
            return res.status(400).json({ message: "Invalid team ID provided." });
        }

        const organizationId = req.user.organizationId;
        const team = await teamService.getById(teamId, organizationId);
        res.status(200).json(team);
    } catch (error) {
        next(error);
    }
};

// Handles PATCH /api/teams/:id
const updateTeam = async (req, res, next) => {
    try {
        const teamId = parseInt(req.params.id, 10);
        if (isNaN(teamId)) {
            return res.status(400).json({ message: "Invalid team ID provided." });
        }

        const organizationId = req.user.organizationId;
        const data = req.body;

        const updatedTeam = await teamService.update(teamId, data, organizationId);
        res.status(200).json(updatedTeam);
    } catch (error) {
        next(error);
    }
};

// Handles DELETE /api/teams/:id
const deleteTeam = async (req, res, next) => {
    try {
        const teamId = parseInt(req.params.id, 10);
        if (isNaN(teamId)) {
            return res.status(400).json({ message: "Invalid team ID provided." });
        }

        const organizationId = req.user.organizationId;
        await teamService.remove(teamId, organizationId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export default {
    searchTeams,
    getMyTeams,
    listTeamsController,
    getTeamById,
    updateTeam,
    deleteTeam,
    createTeamController,
};
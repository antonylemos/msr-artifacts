import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { ApiError } from '../utils/ApiError.js'; // Assuming you have this


/**
 * Searches for teams within an organization that start with a given name.
 */
const searchByName = (organizationId, name) => {
    return prisma.team.findMany({
        where: {
            organizationId,
            name: {
                startsWith: name,
                mode: 'insensitive',
            },
        },
        include: { _count: { select: { teamMemberships: true } } }
    });
};

/**
 * Gets all teams that a specific user is a member of.
 */
const getTeamsForUser = (userId) => {
    return prisma.team.findMany({
        where: {
            teamMemberships: {
                some: { userId: userId },
            },
        },
    });
};

/**
 * Lists all teams for a given organization. For admin use.
 */
const listAll = (organizationId) => {
    return prisma.team.findMany({
        where: { organizationId },
        include: { _count: { select: { teamMemberships: true } } }
    });
};



export const listTeamsService = async (organizationId, queryOptions) => {
  const {
    page = 1,
    limit = 20,
    searchTerm = '',
    sortBy = 'name', // Default sort by team name
    sortOrder = 'asc'  // Default ascending
  } = queryOptions || {}; // Add default for queryOptions to prevent error if undefined

  const skip = (page - 1) * limit;
  const whereConditions = {
    organizationId: organizationId
  };

  if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim() !== '') {
    whereConditions.OR = [
      { name: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  try {
    const teams = await prisma.team.findMany({
      where: whereConditions,
      include: {
        _count: { // To get the number of members in each team
          select: { teamMemberships: true },
        },
        teamMemberships: { // To get a sample of members for avatar stack
          take: 5, // Limit to a few members for the list view (e.g., for avatar stack)
          orderBy: { user: { fullName: 'asc' } }, // Optional: order the sample members
          select: {
            user: {
              select: { // Select only necessary fields for the member preview
                id: true,
                fullName: true,
                firstName: true, // Useful for generating initials if fullName isn't always reliable
                lastName: true,
                profilePictureUrl: true,
                // avatarBg: true, // If you store this in DB; otherwise, frontend can generate
              }
            }
          }
        },
        // You could also include the leadUser if needed for the list
        // lead: {
        //   select: { id: true, fullName: true }
        // }
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: skip,
      take: limit,
    });

    const totalTeams = await prisma.team.count({
      where: whereConditions,
    });

    // Transform data for frontend convenience
    const formattedTeams = teams.map(team => {
      // Generate avatarInitials for each member in the sample
      const membersWithAvatars = team.teamMemberships.map(tm => {
        let initials = 'U';
        if (tm.user.firstName && tm.user.lastName) {
          initials = tm.user.firstName.charAt(0).toUpperCase() + tm.user.lastName.charAt(0).toUpperCase();
        } else if (tm.user.fullName) {
          const names = tm.user.fullName.split(' ');
          initials = names[0].charAt(0).toUpperCase() + (names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '');
        } else if (tm.user.email) { // Fallback to email initial
            initials = tm.user.email.charAt(0).toUpperCase();
        }
        return {
          id: tm.user.id,
          fullName: tm.user.fullName,
          profilePictureUrl: tm.user.profilePictureUrl,
          // These are for the avatar stack on the frontend
          avatarInitials: initials,
          // avatarBg: tm.user.avatarBg || 'bg-gray-400', // If avatarBg is from DB, else frontend handles it
        };
      });

      return {
        id: team.id,
        name: team.name,
        description: team.description,
        isGeneralTeam: team.isGeneralTeam,
        organizationId: team.organizationId,
        leadUserId: team.leadUserId,
        // Add any other scalar team fields you want to return
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        membersCount: team._count.teamMemberships,
        avatarInitial: team.name ? team.name.charAt(0).toUpperCase() : 'T', // Team's own avatar initial
        // avatarBg: team.isGeneralTeam ? 'bg-gray-500' : 'bg-blue-600', // Example default BG for team icon
        members: membersWithAvatars, // The sample of members with their details for avatar stack
      };
    });

    return {
      teams: formattedTeams,
      totalTeams,
      totalPages: Math.ceil(totalTeams / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in listTeamsService:", error);
    // In a real app, you might throw a more specific error or an ApiError
    throw new Error("Failed to retrieve teams from the database.");
  }
};

export const createTeamService = async ({ name, description, organizationId, creatorUserId }) => {
  // Check if team with the same name already exists in this organization
  const existingTeam = await prisma.team.findFirst({
    where: {
      name: name,
      organizationId: organizationId,
    },
  });

  if (existingTeam) {
    throw new ApiError(409, `A team with the name "${name}" already exists in this organization.`);
  }

  // Use a transaction to create the team and add the creator as a member atomically
  const newTeamWithMember = await prisma.$transaction(async (tx) => {
    // 1. Create the Team
    const team = await tx.team.create({
      data: {
        name,
        description,
        organizationId,
        isGeneralTeam: false, // Newly created teams are not the "General" team
        // createdByUserId: creatorUserId, // Optional: if you track who created the team
      },
    });

    // 2. Add the creator as a member of this new team
    // You might assign them a specific priority or role within this team context
    await tx.userTeamMembership.create({
      data: {
        userId: creatorUserId,
        teamId: team.id,
        priorityLevel: 1, // Example: Creator becomes primary member or Team Lead
        // roleInTeam: 'lead' // If you have roles within a team context
      },
    });

    // 3. Fetch the team with its members to return (optional, but good for response)
    const teamToReturn = await tx.team.findUnique({
      where: { id: team.id },
      include: {
        teamMemberships: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true,  firstName: true, lastName: true } // Select user fields for member display
            }
          }
        },
        _count: { // Get the count of members
            select: { teamMemberships: true }
        }
      }
    });
    
    if (!teamToReturn) throw new Error("Failed to retrieve newly created team details."); // Should not happen

    // Transform the response slightly for frontend convenience
    return {
        ...teamToReturn,
        members: teamToReturn.teamMemberships.map(tm => tm.user),
        membersCount: teamToReturn._count.teamMemberships
    };
  });

  return newTeamWithMember;
};

/**
 * Gets a single team by its ID, scoped to the organization.
 * Includes details of its members.
 */
const getById = async (id, organizationId) => {
    const team = await prisma.team.findFirst({
        where: { id, organizationId },
        include: {
            teamMemberships: {
                orderBy: { user: { fullName: 'asc' } },
                include: {
                    user: {
                        select: { id: true, fullName: true, email: true }
                    }
                }
            }
        }
    });
    if (!team) {
        throw new Error("Team not found or you do not have access.");
    }
    return team;
};

/**
 * Updates a team's details.
 */
const update = async (id, data, organizationId) => {
    const team = await prisma.team.findFirst({ where: { id, organizationId }});
    if (!team) {
        throw new Error("Team not found or you do not have access.");
    }
    
    return prisma.team.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
        }
    });
};

/**
 * Deletes a team, preventing the deletion of the "General Team".
 */
const remove = async (id, organizationId) => {
    const team = await prisma.team.findFirst({ where: { id, organizationId }});
    if (!team) {
        throw new Error("Team not found or you do not have access.");
    }
    if (team.isGeneralTeam) {
        throw new Error("The General team cannot be deleted.");
    }

    return prisma.team.delete({
        where: { id }
    });
};


export default {
    searchByName,
    getTeamsForUser,
    listAll,
    getById,
    update,
    remove,
    createTeamService,
    listTeamsService,
};
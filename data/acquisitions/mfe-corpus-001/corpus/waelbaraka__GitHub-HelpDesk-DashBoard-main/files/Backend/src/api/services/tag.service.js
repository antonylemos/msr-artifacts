import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Creates a new tag for a specific team.
 */
export const createTag = async (organizationId, agentId, tagData) => {
  // teamId is now REQUIRED.
  const { name, color, teamId } = tagData;
  if (!name || !teamId) {
    throw new ApiError(400, "Tag name and teamId are required.");
  }

  const sanitizedName = name.toLowerCase().trim().replace(/\s+/g, '-');

  try {
    const [tag] = await sql`
      INSERT INTO "Tag" ("organizationId", "name", "color", "teamId", "createdByAgentId")
      VALUES (${organizationId}, ${sanitizedName}, ${color || null}, ${teamId}, ${agentId})
      RETURNING *;
    `;
    return tag;
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      throw new ApiError(409, `A tag with the name "${sanitizedName}" already exists in this group.`);
    }
    console.error("Error creating tag:", error);
    throw new ApiError(500, "Could not create tag.");
  }
};


/**
 * Lists all tags from all the teams an agent is a member of.
 * THIS IS THE FINAL, CORRECTED VERSION.
 */

export const listTagsForAgent = async (organizationId, agentTeamIds) => {
  // If the agent belongs to no teams, return an empty array immediately.
  if (!agentTeamIds || agentTeamIds.length === 0) {
    return [];
  }

  try {
    // The postgres.js sql helper can directly handle an array for an IN clause.
    const tags = await sql`
      SELECT * FROM "Tag"
      WHERE
        "organizationId" = ${organizationId}
        AND "teamId" IN ${sql(agentTeamIds)}
      ORDER BY "name" ASC;
    `;
    return tags;
  } catch (error) {
    console.error("--- SQL Execution Error in listTagsForAgent ---", error);
    throw new ApiError(500, "Failed to retrieve tags.");
  }
};


/**
 * Updates an existing tag.
 */
export const updateTag = async (tagId, organizationId, updateData) => {
  // ... This function remains largely the same, but teamId is now required.
  const { name, color, teamId } = updateData;
  if (!name || !teamId) throw new ApiError(400, "Tag name and teamId are required for an update.");
  const sanitizedName = name.toLowerCase().trim().replace(/\s+/g, '-');
  
  const [tag] = await sql`
    UPDATE "Tag" SET "name" = ${sanitizedName}, "color" = ${color}, "teamId" = ${teamId}
    WHERE id = ${tagId} AND "organizationId" = ${organizationId}
    RETURNING *;
  `;
  if (!tag) throw new ApiError(404, "Tag not found or permission denied.");
  return tag;
};


/**
 * Deletes a tag.
 */
export const deleteTag = async (tagId, organizationId) => {
  const result = await sql`DELETE FROM "Tag" WHERE id = ${tagId} AND "organizationId" = ${organizationId}`;
  return result.count > 0;
};













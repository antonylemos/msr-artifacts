import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Creates a new Reply Snippet.
 */
export const createSnippet = async (organizationId, agentId, snippetData) => {
  const { teamId, shortcut, text, isGeneralSuggestion = false, tagIds = [] } = snippetData;
  return await sql.begin(async sqlTx => {
    const [snippet] = await sqlTx`
      INSERT INTO "ReplySnippet" ("organizationId", "teamId", "shortcut", "text", "isGeneralSuggestion", "createdByAgentId", "modifiedByAgentId")
      VALUES (${organizationId}, ${teamId || null}, ${shortcut}, ${text}, ${isGeneralSuggestion}, ${agentId}, ${agentId})
      RETURNING *;
    `;
    if (tagIds.length > 0) {
      const tagsToInsert = tagIds.map(tagId => ({ A: snippet.id, B: tagId }));
      // Using the corrected table name
      await sqlTx`INSERT INTO "ReplySnippetToTag" ${sqlTx(tagsToInsert, 'A', 'B')}`;
    }
    return snippet;
  });
};

/**
 * Updates an existing Reply Snippet. THIS IS THE CORRECTED VERSION.
 */
export const updateSnippet = async (snippetId, organizationId, agentId, updateData) => {
  // Provide a default empty array for tagIds if it's missing from the request
  const { teamId, shortcut, text, isGeneralSuggestion, tagIds = [] } = updateData;
  
  return await sql.begin(async sqlTx => {
    const [snippet] = await sqlTx`
      UPDATE "ReplySnippet" SET "teamId" = ${teamId || null}, "shortcut" = ${shortcut}, "text" = ${text},
      "isGeneralSuggestion" = ${isGeneralSuggestion || false}, "modifiedByAgentId" = ${agentId}, "updatedAt" = NOW()
      WHERE id = ${snippetId} AND "organizationId" = ${organizationId}
      RETURNING *;
    `;
    if (!snippet) throw new ApiError(404, "Snippet not found or permission denied.");

    // Use the corrected table name "ReplySnippetToTag"
    await sqlTx`DELETE FROM "ReplySnippetToTag" WHERE "A" = ${snippetId}`;
    if (tagIds.length > 0) {
      const tagsToInsert = tagIds.map(tagId => ({ A: snippetId, B: tagId }));
      await sqlTx`INSERT INTO "ReplySnippetToTag" ${sqlTx(tagsToInsert, 'A', 'B')}`;
    }
    return snippet;
  });
};

/**
 * Deletes a Reply Snippet.
 */
export const deleteSnippet = async (snippetId, organizationId) => {
  const result = await sql`DELETE FROM "ReplySnippet" WHERE id = ${snippetId} AND "organizationId" = ${organizationId}`;
  return result.count > 0;
};


/**
 * Searches for snippets. THIS IS THE FINAL, BULLETPROOF VERSION.
 */
  
 
export const searchSnippets = async (organizationId, agentId, teamId, searchQuery) => {
  // We build the query string and parameters array completely manually
  let query = `SELECT * FROM "ReplySnippet"`;
  
  const params = [];
  const whereClauses = [];
  let paramIndex = 1;
  
  // 1. Add mandatory parameters
  whereClauses.push(`"organizationId" = $${paramIndex++}`);
  params.push(organizationId);
  
  whereClauses.push(`"shortcut" ILIKE $${paramIndex++}`);
  params.push(searchQuery + '%');
  
  // 2. Build the permission clause string manually
  const permissionClauses = [];
  
  // Private to me
  permissionClauses.push(`("createdByAgentId" = $${paramIndex++} AND "teamId" IS NULL)`);
  params.push(agentId);
  
  // Shared with my team
  if (teamId) {
    permissionClauses.push(`"teamId" = $${paramIndex++}`);
    params.push(teamId);
  }
  
  // Shared with the whole organization (is not private and has no team)
  // This is a common way to define org-wide vs private when both have teamId = NULL
  permissionClauses.push(`("teamId" IS NULL AND "createdByAgentId" != $${paramIndex++})`);
  params.push(agentId);

  whereClauses.push(`(${permissionClauses.join(' OR ')})`);

  const whereString = ` WHERE ${whereClauses.join(' AND ')}`;
  query += whereString;

  query += ` ORDER BY "shortcut" ASC LIMIT 20`;
  
  try {
    const snippets = await sql.unsafe(query, params);
    return snippets;
  } catch (error) {
    console.error("--- SQL Execution Error in searchSnippets ---", { query, params, error });
    throw new ApiError(500, "Failed to search for snippets.");
  }
};



/**
 * Lists all snippets for an organization's settings page.
 */
export const listAllSnippets = async (organizationId) => {
  const snippets = await sql`
    SELECT * FROM "ReplySnippet" WHERE "organizationId" = ${organizationId} ORDER BY "updatedAt" DESC;
  `;
  return snippets;
};
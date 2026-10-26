// src/api/services/client.service.js

import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Finds a client by a specific identifier (e.g., phoneNumber, email, whatsappSenderId)
 * or creates a new one if not found.
 * This is crucial for integrations where you receive an identifier from an external channel.
 */
export const findOrCreateClient = async (organizationId, identifierField, identifierValue, clientDataDefaults = {}) => {
  if (!organizationId || !identifierField || !identifierValue) {
    throw new ApiError(400, "Organization ID, identifier field, and identifier value are required for findOrCreateClient.");
  }

  // Ensure identifierField is a valid and safe column name (prevent SQL injection if this were dynamic from user input)
  // For internal use, we assume identifierField is one of our known, safe column names.
  const validIdentifierFields = ['phoneNumber', 'email', 'whatsappSenderId', 'facebookPsId', 'instagramId'];
  if (!validIdentifierFields.includes(identifierField)) {
    throw new ApiError(400, `Invalid identifier field: ${identifierField}`);
  }

  let [client] = await sql`
    SELECT * FROM "Client" 
    WHERE "organizationId" = ${organizationId} AND ${sql(identifierField)} = ${identifierValue}
  `;

  if (client) {
    // Optionally update client if new data is provided and different (e.g., profileNameWhatsapp changed)
    // For now, just return the found client.
    return client;
  } else {
    // Create new client
    const {
      name = null,
      firstName = null,
      lastName = null,
      email = identifierField === 'email' ? identifierValue : null,
      phoneNumber = identifierField === 'phoneNumber' ? identifierValue : null,
      whatsappSenderId = identifierField === 'whatsappSenderId' ? identifierValue : null,
      profileNameWhatsapp = null,
      firstInteractionChannel = null, // This should often be passed in clientDataDefaults
      ...otherDefaults
    } = clientDataDefaults;

 const [newClient] = await sql`
      INSERT INTO "Client" (
        "organizationId", "name", "firstName", "lastName", email, "phoneNumber", 
        "whatsappSenderId", "profileNameWhatsapp", "firstInteractionChannel", 
        "firstSeenAtUtc", "lastSeenAtUtc", "lastInteractionAtUtc"
      ) VALUES (
        ${organizationId}, 
        ${name || null}, 
        ${firstName || null}, 
        ${lastName || null}, 
        ${email?.toLowerCase() || null}, 
        ${phoneNumber || null}, 
        ${whatsappSenderId || null}, 
        ${profileNameWhatsapp || null}, 
        ${firstInteractionChannel || null},
        NOW(), 
        NOW(),
        NOW() -- Also initialize lastInteractionAtUtc for new clients
      )
      RETURNING *;
    `;
    return newClient;
  }
};

/**
 * Get a client by their ID and organization ID.
 */
export const getClientById = async (clientId, organizationId) => {
  if (!clientId || !organizationId) {
    throw new ApiError(400, "Client ID and Organization ID are required.");
  }
  const [client] = await sql`
    SELECT * FROM "Client" 
    WHERE id = ${clientId} AND "organizationId" = ${organizationId}
  `;
  if (!client) {
    // Do not throw ApiError(404) here, let controller handle it. Service returns null if not found.
    return null;
  }
  return client;
};

/**
 * List clients for an organization with pagination and filtering.
 */
export const listClients = async (organizationId, { page = 1, limit = 20, searchTerm = '', segment, tags, sortBy = 'lastSeenAtUtc', sortOrder = 'desc' } = {}) => {
  const offset = (page - 1) * limit;
  let whereClauses = [sql`"organizationId" = ${organizationId}`];
  let queryParams = [];

  if (searchTerm) {
    const searchPattern = `%${searchTerm.toLowerCase()}%`;
    whereClauses.push(sql`
      (LOWER(name) LIKE ${searchPattern} OR 
       LOWER(email) LIKE ${searchPattern} OR 
       "phoneNumber" LIKE ${searchPattern} OR
       "whatsappSenderId" LIKE ${searchPattern})
    `);
  }

  if (segment) {
    whereClauses.push(sql`"userSegment" = ${segment}`);
  }

  if (tags && tags.length > 0) {
    // Assumes tags is an array of strings: ['tag1', 'tag2']
    whereClauses.push(sql`tags @> ${tags}`); // PostgreSQL array contains operator
  }

  const whereSql = whereClauses.length > 0 ? sql`WHERE ${sql.join(whereClauses, sql` AND `)}` : sql``;
  
  const validSortColumns = {
    lastSeenAtUtc: sql`"lastSeenAtUtc"`,
    createdAt: sql`"createdAt"`,
    name: sql`name`,
    email: sql`email`
  };
  const orderByColumn = validSortColumns[sortBy] || validSortColumns.lastSeenAtUtc;
  const orderByDirection = sortOrder.toLowerCase() === 'asc' ? sql`ASC` : sql`DESC NULLS LAST`;


  const clients = await sql`
    SELECT * FROM "Client"
    ${whereSql}
    ORDER BY ${orderByColumn} ${orderByDirection}
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*) FROM "Client"
    ${whereSql}
  `;

  return {
    clients,
    totalClients: parseInt(count, 10),
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
};

/**
 * Update client details.
 */
export const updateClient = async (clientId, organizationId, updateData) => {
  if (!clientId || !organizationId) {
    throw new ApiError(400, "Client ID and Organization ID are required.");
  }
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No update data provided.");
  }

  // Sanitize updateData - only allow specific fields to be updated this way
  const allowedFields = ['name', 'firstName', 'lastName', 'email', 'phoneNumber', 'avatarUrl', 'languagePreference', 'userSegment', 'timezone', 'customAttributes', 'tags', 'optInStatus', 'isBanned', 'banDetails', 'assignedAgentId'];
  const dataToSet = {};
  for (const key of allowedFields) {
    if (updateData.hasOwnProperty(key)) {
      if (key === 'email' && updateData[key]) {
        dataToSet[key] = updateData[key].toLowerCase();
      } else {
        dataToSet[key] = updateData[key];
      }
    }
  }

  if (Object.keys(dataToSet).length === 0) {
    throw new ApiError(400, "No valid fields provided for update.");
  }
  dataToSet.updatedAt = new Date(); // Manually set updatedAt for raw SQL

  const [updatedClient] = await sql`
    UPDATE "Client" SET ${sql(dataToSet)}
    WHERE id = ${clientId} AND "organizationId" = ${organizationId}
    RETURNING *
  `;

  if (!updatedClient) {
    return null; // Or throw ApiError(404) if client not found for that org
  }
  return updatedClient;
};

/**
 * Add a note to a client's notes array.
 * noteObject should be: { agentIdRef, agentNameSnapshot, noteText, timestamp }
 */
export const addNoteToClient = async (clientId, organizationId, noteObject) => {
  if (!clientId || !organizationId || !noteObject || !noteObject.noteText) {
    throw new ApiError(400, "Client ID, Organization ID, and note text are required.");
  }
  // Add server-side timestamp if not provided
  if (!noteObject.timestamp) {
    noteObject.timestamp = new Date().toISOString();
  }

  const [result] = await sql`
    UPDATE "Client"
    SET notes = notes || ${sql.json([noteObject])}::jsonb[], "updatedAt" = NOW()
    WHERE id = ${clientId} AND "organizationId" = ${organizationId}
    RETURNING notes; 
  `; // Using jsonb_build_array to ensure it's an element, then casting the array
  if (!result) return null; // Client not found
  return result.notes;
};

/**
 * Update client's opt-in status for a specific channel and category.
 * e.g., channel = 'whatsapp', category = 'marketing_promotions', status = true
 */
export const updateClientOptIn = async (clientId, organizationId, channel, category, optedInStatus) => {
  if (!clientId || !organizationId || !channel || !category || typeof optedInStatus !== 'boolean') {
    throw new ApiError(400, "Client ID, Organization ID, channel, category, and opt-in status are required.");
  }

  // Path to update, e.g., '{"whatsapp", "marketing_promotions"}'
  const path = `{${channel},${category}}`;
  const valueToSet = sql.json(optedInStatus);

  const [updatedClient] = await sql`
    UPDATE "Client"
    SET "optInStatus" = jsonb_set("optInStatus", ${path}, ${valueToSet}, true), "updatedAt" = NOW()
    WHERE id = ${clientId} AND "organizationId" = ${organizationId}
    RETURNING *; 
  `; // `true` at the end of jsonb_set creates the path if it doesn't exist.
  
  if (!updatedClient) return null;
  return updatedClient.optInStatus;
};
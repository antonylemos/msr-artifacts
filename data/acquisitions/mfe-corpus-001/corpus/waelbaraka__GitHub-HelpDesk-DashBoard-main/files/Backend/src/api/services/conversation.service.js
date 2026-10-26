import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';
import { sendWhatsAppMessageViaProvider } from '../../integrations/whatsapp/whatsapp.webhook.service.js';

// ... (rest of conversation.service.js)

/**
 * Get a conversation by ID.
 */
export const getConversationById = async (conversationId, organizationId) => {
  const [conversation] = await sql`
    SELECT c.*, 
           cl.name as "clientName", cl.email as "clientEmail", cl."phoneNumber" as "clientPhoneNumber",
           u. "fullName" as "assignedAgentFullName" 
    FROM "Conversation" c
    LEFT JOIN "Client" cl ON c."clientId" = cl.id
    LEFT JOIN "User" u ON c."assignedAgentId" = u.id
    WHERE c.id = ${conversationId} AND c."organizationId" = ${organizationId}
  `;
  return conversation || null;
};

/**
 * List conversations with filters and pagination.
 */


 
/**
 * Update conversation status.
 */
export const updateConversationStatus = async (conversationId, organizationId, newStatus, updatedByUserId = null) => {
  const updateData = { status: newStatus, lastStatusUpdateAtUtc: new Date() };
  if (newStatus === 'closed_by_system' || newStatus === 'resolved_by_agent' || newStatus === 'resolved_by_client') {
    updateData.closedAtUtc = new Date();
    if (newStatus === 'resolved_by_agent' && updatedByUserId) {
      updateData.resolvedByAgentIdRef = updatedByUserId;
    }
  }

  const [updatedConversation] = await sql`
    UPDATE "Conversation" SET ${sql(updateData)}, "updatedAt" = NOW()
    WHERE id = ${conversationId} AND "organizationId" = ${organizationId}
    RETURNING *;
  `;
  if (updatedConversation) {
    // Add to lifecycleEvents (simplified example)
    const event = { eventType: 'status_changed', timestamp: new Date(), newStatus, agentId: updatedByUserId };
    await sql`
        UPDATE "Conversation" 
        SET "lifecycleEvents" = "lifecycleEvents" || ${sql.json([event])}::jsonb[]
        WHERE id = ${conversationId};
    `;
  }
  return updatedConversation || null;
};


/**
 * Lists conversations for an organization with filtering and pagination.
 * @param {number} organizationId
 * @param {object} filters - Contains { statuses, agentId, teamId }
 * @param {object} pagination - Contains { limit, offset }
 * @returns {Promise<object>} An object with conversations and pagination details.
 */  
const VALID_CONVERSATION_STATUSES = [
  'new', 'open', 'pending_agent_reply', 'pending_client_reply',
  'on_hold_agent', 'on_hold_client', 'resolved_by_agent', 'resolved_by_client',
  'closed_by_system', 'abandoned_by_client', 'spam', 'archived'
];

 
 
export const listConversations = async (organizationId, filters = {}, pagination = {}) => {
  const { statuses, agentId, teamId } = filters;
  const limit = parseInt(pagination.limit, 10) || 50;
  const offset = parseInt(pagination.offset, 10) || 0;
  let query = `SELECT c.*, cl.name as "clientName", cl."profileNameWhatsapp", (SELECT content FROM "Message" WHERE "conversationId" = c.id AND "isInternalNote" = false ORDER BY "createdAt" DESC LIMIT 1) as "lastMessagePreview" FROM "Conversation" c JOIN "Client" cl ON c."clientId" = cl.id`;
  let countQuery = `SELECT count(*) FROM "Conversation" c`;
  const params = [organizationId];
  const whereClauses = [`c."organizationId" = $1`];
  let paramIndex = 2;
  if (agentId) { whereClauses.push(`c."assignedAgentId" = $${paramIndex++}`); params.push(agentId); }
  if (teamId) { whereClauses.push(`c."teamId" = $${paramIndex++}`); params.push(teamId); }
  if (statuses && statuses.length > 0) {
    const safeStatuses = statuses.filter(s => VALID_CONVERSATION_STATUSES.includes(s));
    if (safeStatuses.length > 0) {
      const statusListString = safeStatuses.map(s => `'${s}'`).join(',');
      whereClauses.push(`c.status IN (${statusListString})`);
    }
  }
  const whereString = ` WHERE ${whereClauses.join(' AND ')}`;
  query += whereString + ` ORDER BY c."lastInteractionAtUtc" DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  countQuery += whereString;
  const mainQueryParams = [...params, limit, offset];
  const countQueryParams = [...params];
  try {
    const conversations = await sql.unsafe(query, mainQueryParams);
    const [{ count }] = await sql.unsafe(countQuery, countQueryParams);
    return { conversations, totalConversations: parseInt(count, 10), currentPage: Math.floor(offset / limit) + 1, totalPages: Math.ceil(count / limit) };
  } catch (error) {
    console.error("--- SQL Execution Error in listConversations ---", { query, mainQueryParams, error });
    throw new ApiError(500, "Failed to execute conversation search.");
  }
};


/**
 * Creates a new conversation record in the database.
 * @param {object} convoData - The data for the new conversation.
 * @returns {Promise<object>} The newly created conversation object.
 */
export const createConversation = async (convoData) => {
    const { organizationId, clientId, sourceChannel, status = 'new', whatsappSenderIdSnapshot, externalChannelConversationId, initiatedAtUtc } = convoData;
    const [newConversation] = await sql`
        INSERT INTO "Conversation" ("organizationId", "clientId", "sourceChannel", "status", "whatsappSenderIdSnapshot", "externalChannelConversationId", "initiatedAtUtc", "lastInteractionAtUtc", "lastStatusUpdateAtUtc")
        VALUES (${organizationId}, ${clientId}, ${sourceChannel}, ${status}, ${whatsappSenderIdSnapshot || null}, ${externalChannelConversationId || null}, ${initiatedAtUtc || new Date()}, ${initiatedAtUtc || new Date()}, ${initiatedAtUtc || new Date()})
        RETURNING *;
    `;
    return newConversation;
};

/**
 * Finds the most recent, non-closed conversation for a given client and channel.
 * @param {number} clientId - The internal ID of the client.
 * @param {number} organizationId - The organization ID.
 * @param {string} sourceChannel - e.g., 'whatsapp'.
 * @param {string} externalChannelId - The specific channel ID, e.g., the Meta Phone Number ID.
 * @returns {Promise<object|null>} The conversation object or null if not found.
 */

export const findActiveConversationByClient = async (clientId, organizationId, sourceChannel, externalChannelId) => {
  const activeStatuses = ['new', 'open', 'pending_agent_reply', 'pending_client_reply'];
  const [conversation] = await sql`
    SELECT * FROM "Conversation" WHERE "clientId" = ${clientId} AND "organizationId" = ${organizationId}
    AND "sourceChannel" = ${sourceChannel} AND "externalChannelConversationId" = ${externalChannelId}
    AND status IN ${sql(activeStatuses)} AND "lastInteractionAtUtc" > NOW() - INTERVAL '24 hours' 
    ORDER BY "lastInteractionAtUtc" DESC LIMIT 1;
  `;
  return conversation || null;
};
/**
 * Fetches a rich conversation object suitable for sending over Socket.IO.
 * @param {number} conversationId
 * @returns {Promise<object|null>}
 */

 
export const getConversationForSocket = async (conversationId) => {
  if (!conversationId) return null;
  const [conversation] = await sql`
      SELECT c.*, cl.name as "clientName", cl."profileNameWhatsapp", (SELECT content FROM "Message" WHERE "conversationId" = c.id AND "isInternalNote" = false ORDER BY "createdAt" DESC LIMIT 1) as "lastMessagePreview"
      FROM "Conversation" c LEFT JOIN "Client" cl ON c."clientId" = cl.id
      WHERE c.id = ${conversationId} LIMIT 1;
  `;
  return conversation || null;
};

/**
 * Updates timestamp fields on a conversation record.
 * @param {number} conversationId - The ID of the conversation to update.
 * @param {object} timestampFields - An object of fields to update, e.g., { lastInteractionAtUtc: new Date() }.
 * @returns {Promise<object|null>} The updated conversation object.
 */ 





export const updateConversationTimestamps = async (conversationId, timestampFields) => {
  if (!conversationId || Object.keys(timestampFields).length === 0) return null;
  const updatePayload = { ...timestampFields, updatedAt: new Date() };
  const [updatedConversation] = await sql`UPDATE "Conversation" SET ${sql(updatePayload)} WHERE id = ${conversationId} RETURNING *;`;
  return updatedConversation;
};








/**
 * Adds a new message to a conversation and triggers outgoing sends if necessary.
 * @param {number} conversationId
 * @param {object} messageData - Contains sender info, content, etc.
 * @returns {Promise<object>} The newly created message object.
 */
  


export const addMessageToConversation = async (conversationId, messageData) => {
  const { senderType, senderId, senderNameSnapshot, messageType = 'text', content, isInternalNote = false, channelMessageId = null, clientTimestamp = null, options = {} } = messageData;
  if (!conversationId || !senderType || !senderId) throw new ApiError(400, "Missing required message data.");
  
  const isOutgoing = (senderType === 'agent' || senderType === 'system') && !isInternalNote;
  const initialStatus = isOutgoing ? 'pending_send' : 'delivered_to_recipient';

  // 1. Save the message to the database
  const [message] = await sql`
    INSERT INTO "Message" ("conversationId", "senderType", "senderId", "senderNameSnapshot", "messageType", "content", "isInternalNote", "status", "channelMessageId", "clientTimestamp")
    VALUES (${conversationId}, ${senderType}, ${String(senderId)}, ${senderNameSnapshot || null}, ${messageType}, ${content || null}, ${isInternalNote}, ${initialStatus}, ${channelMessageId}, ${clientTimestamp})
    RETURNING *;
  `;
  if (!message) throw new ApiError(500, "Failed to save message to database.");
  console.log(`Message ${message.id} saved to conversation ${conversationId}`);

  // 2. Update conversation timestamps
  const timestampUpdates = { lastInteractionAtUtc: message.createdAt };
  if (senderType === 'client') {
    timestampUpdates.status = 'pending_agent_reply';
    timestampUpdates.lastClientReplyAtUtc = message.createdAt;
  } else if (senderType === 'agent') {
    timestampUpdates.status = 'pending_client_reply'; // After an agent replies, we wait for the client
    timestampUpdates.lastAgentReplyAtUtc = message.createdAt;
  }
  await updateConversationTimestamps(conversationId, timestampUpdates);

  // --- (3) THE FIX: Corrected and Logged Outgoing Logic ---
  console.log(`[AddMessage] Checking if message is outgoing. senderType: ${senderType}, isInternalNote: ${isInternalNote}. isOutgoing: ${isOutgoing}`);
  if (isOutgoing) {
    console.log(`[AddMessage] Message ${message.id} is outgoing. Fetching conversation details...`);
    const [convoDetails] = await sql`SELECT "organizationId", "sourceChannel", "whatsappSenderIdSnapshot" as "clientWaId" FROM "Conversation" WHERE id = ${conversationId}`;
    
    if (convoDetails?.sourceChannel === 'whatsapp' && convoDetails.clientWaId) {
      console.log(`[AddMessage] Conversation is WhatsApp. Calling sender service for client: ${convoDetails.clientWaId}`);
      try {
        const sendOutcome = await sendWhatsAppMessageViaProvider(convoDetails.organizationId, convoDetails.clientWaId, null, content, messageType, options);
        if (sendOutcome?.success) {
          console.log(`[AddMessage] WhatsApp send successful. Updating message ${message.id} with WAMID.`);
          await sql`UPDATE "Message" SET "channelMessageId" = ${sendOutcome.channelMessageId}, status = 'sent_to_channel', "sentAt" = NOW() WHERE id = ${message.id}`;
        } else {
          console.error(`[AddMessage] WhatsApp send FAILED. Reason: ${sendOutcome?.error}`);
          await sql`UPDATE "Message" SET status = 'failed_to_send', "failureReason" = ${sendOutcome?.error || 'Send failed'} WHERE id = ${message.id}`;
        }
      } catch (error) {
        console.error(`[AddMessage] CRITICAL ERROR during WhatsApp send:`, error);
        await sql`UPDATE "Message" SET status = 'failed_to_send', "failureReason" = ${error.message} WHERE id = ${message.id}`;
      }
    } else {
      console.log(`[AddMessage] Message ${message.id} is outgoing but not for a WhatsApp channel. No send action taken.`);
    }
  }

  const updatedConversation = await getConversationForSocket(conversationId);
  return { newMessage: message, updatedConversation };
};





/**
 * Assigns a conversation to a specific agent or team and creates an audit event.
 * @param {number} conversationId
 * @param {number} organizationId
 * @param {object} assignment - Contains { agentId, teamId }
 * @param {number} assignedByUserId - The agent performing the assignment.
 * @returns {Promise<object>} The updated rich conversation object.
 */



export const assignConversation = async (conversationId, organizationId, { agentId, teamId }, assignedByUserId) => {
  if (agentId === undefined && teamId === undefined) {
    throw new ApiError(400, "Agent ID or Team ID must be provided for assignment.");
  }
  
  // Build the SET clause and parameters manually
  const setClauses = [`status = 'open'`, `"lastStatusUpdateAtUtc" = NOW()`, `"updatedAt" = NOW()`];
  const params = [];
  let paramIndex = 1;

  if (agentId !== undefined) {
    setClauses.push(`"assignedAgentId" = $${paramIndex++}`);
    params.push(agentId);
  }
  if (teamId !== undefined) {
    setClauses.push(`"teamId" = $${paramIndex++}`);
    params.push(teamId);
  }
  
  // Add conversationId and organizationId to the end of the params for the WHERE clause
  const whereParam1 = paramIndex++;
  const whereParam2 = paramIndex++;
  params.push(conversationId, organizationId);

  const query = `UPDATE "Conversation" SET ${setClauses.join(', ')} WHERE id = $${whereParam1} AND "organizationId" = $${whereParam2} RETURNING *;`;
  
  const [updatedConvo] = await sql.unsafe(query, params);
  
  if (!updatedConvo) {
    throw new ApiError(404, "Conversation not found or permission denied.");
  }
  
  const event = { eventType: 'assignment_changed', timestamp: new Date(), details: { agentId, teamId }, assignedBy: assignedByUserId };
  await sql`UPDATE "Conversation" SET "lifecycleEvents" = "lifecycleEvents" || ${sql.json(event)}::jsonb WHERE id = ${conversationId};`;

  return await getConversationForSocket(updatedConvo.id);
};










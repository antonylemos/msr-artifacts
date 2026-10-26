// src/api/services/message.service.js

import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * List messages for a conversation with pagination.
 */
export const listMessagesForConversation = async (conversationId, organizationId, { page = 1, limit = 50, beforeMessageId = null, afterMessageId = null } = {}) => {
  // First, verify the conversation belongs to the organization for security
  const [conversation] = await sql`SELECT id FROM "Conversation" WHERE id = ${conversationId} AND "organizationId" = ${organizationId}`;
  if (!conversation) {
    throw new ApiError(404, "Conversation not found or access denied.");
  }

  let cursorCondition = sql``;
  // Basic cursor pagination (can be improved with keyset pagination)
  if (beforeMessageId) {
    cursorCondition = sql`AND id < ${beforeMessageId}`;
  } else if (afterMessageId) {
    // This is for loading newer messages, typically less common for initial load
    // cursorCondition = sql`AND id > ${afterMessageId}`; 
    // For loading older messages, we usually sort DESC and use id < cursor
  }

  const messages = await sql`
    SELECT * FROM "Message"
    WHERE "conversationId" = ${conversationId} ${cursorCondition}
    ORDER BY "createdAt" DESC -- Get latest first for typical chat UI
    LIMIT ${limit}
  `;

  // For a chat UI, you usually want to reverse them for display (oldest at top)
  return messages.reverse(); 
};

/**
 * Update message status (e.g., from 'sent_to_channel' to 'delivered_to_recipient').
 * This is typically called by webhook handlers from messaging channels.
 */

export const updateMessageStatusByChannelId = async (channelMessageId, newStatus, statusTimestampFields = {}) => {
  if (!channelMessageId || !newStatus) {
    throw new ApiError(400, "Channel Message ID and new status are required for update.");
  }
  
  const updateFields = {
    status: newStatus,
    ...statusTimestampFields,
  };

  const [updatedMessage] = await sql`
    UPDATE "Message" SET ${sql(updateFields)}
    WHERE "channelMessageId" = ${channelMessageId}
    RETURNING *;
  `;
  return updatedMessage || null;
};




export const getMessageByChannelId = async (channelMessageId) => {
  if (!channelMessageId) return null;
  
  const [message] = await sql`
    SELECT * FROM "Message"
    WHERE "channelMessageId" = ${channelMessageId}
    LIMIT 1;
  `;
  return message || null;
};



export const mapWhatsAppStatusToAppStatus = (whatsAppStatus, timestamp, errors) => {
  let appMessageStatus;
  let statusTimestampField = {};

  switch(whatsAppStatus) {
    case 'sent': 
      appMessageStatus = 'sent_to_channel';
      statusTimestampField.sentAt = timestamp;
      break;
    case 'delivered': 
      appMessageStatus = 'delivered_to_recipient'; 
      statusTimestampField.deliveredToRecipientAt = timestamp;
      break;
    case 'read': 
      appMessageStatus = 'read_by_recipient'; 
      statusTimestampField.readByRecipientAt = timestamp;
      break;
    case 'failed': 
      appMessageStatus = 'failed_to_send'; 
      statusTimestampField.failureReason = errors?.[0]?.title || 'Unknown failure';
      statusTimestampField.errorCode = errors?.[0]?.code?.toString();
      break;
    default:
      console.warn(`Message Service: Unhandled WhatsApp status type: ${whatsAppStatus}`);
      return { appMessageStatus: null, statusTimestampField: {} };
  }
  return { appMessageStatus, statusTimestampField };
};







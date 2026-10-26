// src/integrations/whatsapp/whatsapp.channel.service.js
import sql from '../../db/sqlClient.js';
import { ApiError } from '../../api/utils/ApiError.js';
// In a real app, you'd use a proper encryption library for API keys/tokens
// For now, we'll store them as plain text (NOT recommended for production).

export const createWhatsAppChannel = async (organizationId, channelData) => {
  const { channelName, phoneNumber, provider, twilioAccountSid, twilioAuthToken, metaPhoneNumberId, metaAccessToken, webhookVerificationToken } = channelData;
  
  if (!organizationId || !channelName || !phoneNumber || !provider) {
    throw new ApiError(400, "Organization ID, channel name, phone number, and provider are required.");
  }

  // Basic validation for provider-specific fields
  if (provider === 'twilio' && (!twilioAccountSid || !twilioAuthToken)) {
    throw new ApiError(400, "Twilio Account SID and Auth Token are required for Twilio provider.");
  }
  if (provider === 'meta_cloud_api' && (!metaPhoneNumberId || !metaAccessToken)) {
    throw new ApiError(400, "Meta Phone Number ID and Access Token are required for Meta Cloud API.");
  }

  const [newChannel] = await sql`
    INSERT INTO "WhatsAppChannel" (
      "organizationId", "channelName", "phoneNumber", provider,
      "twilioAccountSid", "twilioAuthToken", 
      "metaPhoneNumberId", "metaAccessToken",
      "webhookVerificationToken", "isActive"
    ) VALUES (
      ${organizationId}, ${channelName}, ${phoneNumber}, ${provider},
      ${twilioAccountSid || null}, ${twilioAuthToken || null},
      ${metaPhoneNumberId || null}, ${metaAccessToken || null},
      ${webhookVerificationToken || crypto.randomBytes(16).toString('hex')}, false 
    ) RETURNING *; 
  `; // isActive is false by default, admin enables after webhook setup.
  return newChannel;
};

export const getWhatsAppChannelById = async (channelId, organizationId) => {
  const [channel] = await sql`
    SELECT * FROM "WhatsAppChannel" WHERE id = ${channelId} AND "organizationId" = ${organizationId}
  `;
  return channel || null;
};

export const listWhatsAppChannels = async (organizationId) => {
  if (!organizationId && organizationId !== 0) { // Ensure organizationId is valid
    console.warn(`SERVICE (listWhatsAppChannels): Invalid or missing organizationId: ${organizationId}. Returning empty array.`);
    return [];
  }
  console.log(`SERVICE (listWhatsAppChannels): Querying DB for channels with organizationId: ${organizationId}`);
  
  try {
    const channelsFromDb = await sql`
      SELECT 
        id, 
        "organizationId", -- Good to select for verification
        "channelName", 
        "phoneNumber", 
        provider, 
        "isActive",
        "metaPhoneNumberId",    -- Add fields needed by the settings page list
        "metaBusinessAccountId" -- Add fields needed
        -- DO NOT SELECT sensitive tokens like metaAccessToken here for a list view
      FROM "WhatsAppChannel" 
      WHERE "organizationId" = ${organizationId}
      ORDER BY "createdAt" DESC;
    `;
    
    console.log(`SERVICE (listWhatsAppChannels): Found ${channelsFromDb.count} channels in DB for org ${organizationId}:`, JSON.stringify(channelsFromDb));
    return channelsFromDb; // sql client returns an array (or array-like object with .count)
  } catch (error) {
    console.error(`SERVICE (listWhatsAppChannels): DB Error for org ${organizationId}:`, error);
    throw error; // Re-throw to be caught by controller
  }
};

export const updateWhatsAppChannel = async (channelId, organizationId, updateData) => {
  // Only allow updating specific fields, especially credentials and isActive status
  const allowedUpdates = ['channelName', 'isActive', 'webhookVerificationToken', 
                          'twilioAccountSid', 'twilioAuthToken', 
                          'metaPhoneNumberId', 'metaAccessToken',    'metaBusinessAccountId'
];
  const dataToSet = {};
  for (const key of allowedUpdates) {
    if (updateData.hasOwnProperty(key)) {
      dataToSet[key] = updateData[key];
    }
  }
  if (Object.keys(dataToSet).length === 0) {
    throw new ApiError(400, "No valid fields provided for update.");
  }
  dataToSet.updatedAt = new Date();

  const [updatedChannel] = await sql`
    UPDATE "WhatsAppChannel" SET ${sql(dataToSet)}
    WHERE id = ${channelId} AND "organizationId" = ${organizationId}
    RETURNING *;
  `;
  return updatedChannel || null;
};

export const deleteWhatsAppChannel = async (channelId, organizationId) => {
  const [deletedChannel] = await sql`
    DELETE FROM "WhatsAppChannel" 
    WHERE id = ${channelId} AND "organizationId" = ${organizationId}
    RETURNING id;
  `;
  return deletedChannel;
};

// Helper to get active channel credentials for sending messages
export const getActiveChannelForSending = async (organizationId, phoneNumberToMatch) => {
    console.log(`getActiveChannelForSending: orgId=${organizationId} (type: ${typeof organizationId}), phoneToMatch=${phoneNumberToMatch}`);
    let channel;

    if (typeof organizationId !== 'number' || isNaN(organizationId)) {
        console.error("getActiveChannelForSending: Invalid organizationId type or value.");
        // throw new ApiError(400, "Internal: organizationId must be an integer."); // Or handle gracefully
        return null; // Or throw error
    }

    if (phoneNumberToMatch && typeof phoneNumberToMatch === 'string') {
        [channel] = await sql`
            SELECT * FROM "WhatsAppChannel" 
            WHERE "organizationId" = ${organizationId} AND "phoneNumber" = ${phoneNumberToMatch} AND "isActive" = true
            LIMIT 1;
        `;
    }
    if (!channel) {
        [channel] = await sql`
            SELECT * FROM "WhatsAppChannel" 
            WHERE "organizationId" = ${organizationId} AND "isActive" = true
            ORDER BY "createdAt" ASC 
            LIMIT 1;
        `;
    }
    if (!channel) {
        console.warn(`No active WhatsApp channel found for organizationId: ${organizationId} and/or phone: ${phoneNumberToMatch}`);
    }
    return channel || null;
};




// ...existing code...

export const getChannelByMetaPhoneNumberId = async (phoneNumberId) => {
  try {
    const [channel] = await sql`
      SELECT * FROM "WhatsAppChannel"
      WHERE "metaPhoneNumberId" = ${phoneNumberId}
      AND "isActive" = true
      LIMIT 1
    `;
    
    if (!channel) {
      throw new Error(`No active WhatsApp channel found for phone number ID: ${phoneNumberId}`);
    }
    
    return channel;
  } catch (error) {
    console.error('Error getting WhatsApp channel:', error);
    throw error;
  }
};










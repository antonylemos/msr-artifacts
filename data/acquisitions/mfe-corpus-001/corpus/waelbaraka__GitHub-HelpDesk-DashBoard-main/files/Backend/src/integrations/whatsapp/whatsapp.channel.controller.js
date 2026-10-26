// src/integrations/whatsapp/whatsapp.channel.controller.js
import * as channelService from './whatsapp.channel.service.js';
// ...
import { ApiError } from '../../api/utils/ApiError.js';
import sql from '../../db/sqlClient.js';
import * as webhookService from './whatsapp.webhook.service.js';
// ... other controllers for list, get, update, delete ...


export const deleteChannelController = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { channelId } = req.params;
    const deleted = await channelService.deleteWhatsAppChannel(parseInt(channelId), organizationId);
    if (!deleted) {
      return next(new ApiError(404, 'WhatsApp channel not found.'));
    }
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};


export const getChannelByIdController = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { channelId } = req.params;
    const channel = await channelService.getWhatsAppChannelById(parseInt(channelId), organizationId);
    if (!channel) {
      return next(new ApiError(404, 'WhatsApp channel not found.'));
    }
    // Mask sensitive data before sending back
    const { metaAccessToken, twilioAuthToken, ...safeChannelData } = channel;
    res.json(safeChannelData);
  } catch (error) {
    next(error);
  }
};




export const createChannelController = async (req, res, next) => {
  try {
    const { organizationId } = req.user; // From isAuthenticated middleware
    const channelData = req.body;
    // Basic validation for Meta Cloud API specific fields (can be more robust)
    if (channelData.provider === 'meta_cloud_api' && (!channelData.metaPhoneNumberId || !channelData.metaAccessToken || !channelData.metaBusinessAccountId)) {
        return next(new ApiError(400, "For Meta Cloud API, Phone Number ID, Business Account ID, and Access Token are required."));
    }
    const newChannel = await channelService.createWhatsAppChannel(organizationId, channelData);
    res.status(201).json(newChannel);
  } catch (error) {
    if (error.code === '23505' && error.constraint && error.constraint.includes('whatsapp_channel_org_phone_unique')) {
        return next(new ApiError(409, `A WhatsApp channel with phone number ${req.body.phoneNumber} already exists for this organization.`));
    }
    next(error);
  }
};


export const listChannelsController = async (req, res, next) => {
  try {
    const { organizationId } = req.user; // Comes from isAuthenticated middleware
    // Log here to ensure organizationId is correct
    console.log(`CONTROLLER (listChannels): Fetching channels for organizationId: ${organizationId}`);
    
    const channels = await channelService.listWhatsAppChannels(organizationId);
    
    // Log what the service returns
    console.log(`CONTROLLER (listChannels): Service returned ${channels ? channels.length : 'null/undefined'} channels:`, channels);
    
    res.json(channels || []); // Ensure an array is always sent, even if service returns null/undefined
  } catch (error) {
    next(error);
  }
};


export const updateChannelController = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { channelId } = req.params;
    const updateData = req.body;

    // Validate Meta Cloud API fields if provider is 'meta_cloud_api' or being changed to it
    if (updateData.provider === 'meta_cloud_api' || (await channelService.getWhatsAppChannelById(parseInt(channelId), organizationId))?.provider === 'meta_cloud_api') {
        if (updateData.hasOwnProperty('metaPhoneNumberId') && !updateData.metaPhoneNumberId) {
            return next(new ApiError(400, "Meta Phone Number ID cannot be empty if provided."));
        }
        if (updateData.hasOwnProperty('metaAccessToken') && !updateData.metaAccessToken) {
            return next(new ApiError(400, "Meta Access Token cannot be empty if provided."));
        }
        if (updateData.hasOwnProperty('metaBusinessAccountId') && !updateData.metaBusinessAccountId) {
            return next(new ApiError(400, "Meta Business Account ID cannot be empty if provided."));
        }
    }
    
    // Prevent sending masked tokens for update unless it's a new, real token
    if (updateData.metaAccessToken && updateData.metaAccessToken.includes('********')) {
        delete updateData.metaAccessToken;
    }
    if (updateData.twilioAuthToken && updateData.twilioAuthToken.includes('********')) {
        delete updateData.twilioAuthToken;
    }

    const updatedChannel = await channelService.updateWhatsAppChannel(parseInt(channelId), organizationId, updateData);
    if (!updatedChannel) {
      return next(new ApiError(404, 'WhatsApp channel not found or update failed.'));
    }
    // Mask sensitive data before sending back
    const { metaAccessToken, twilioAuthToken, ...safeChannelData } = updatedChannel;
    res.json(safeChannelData);
  } catch (error) {
     if (error.code === '23505' && error.constraint && error.constraint.includes('whatsapp_channel_org_phone_unique')) {
        return next(new ApiError(409, `A WhatsApp channel with phone number ${req.body.phoneNumber} already exists for this organization.`));
    }
    next(error);
  }
};






// --- ADD THIS NEW CONTROLLER ---
export const sendTestMessageController = async (req, res, next) => {
    try {
        const { organizationId } = req.user;
        const { channelId } = req.params;
        const { testPhoneNumber } = req.body; // Expect a phone number to send to

        if (!testPhoneNumber) {
            return next(new ApiError(400, "A phone number to send the test message to is required."));
        }

        const channel = await channelService.getWhatsAppChannelById(parseInt(channelId, 10), organizationId);

        if (!channel || !channel.isActive) {
            return next(new ApiError(404, 'Channel not found or is not active.'));
        }

        const result = await webhookService.sendWhatsAppMessageViaProvider(
            organizationId,
            testPhoneNumber, // Send to the provided number
            channel.phoneNumber, // Send FROM the channel's number
            `This is a test message from your HelpDesk platform for channel "${channel.channelName}".`,
            'text',
            {}
        );

        if (!result.success) {
            // Throw an error so the frontend can catch it
            throw new ApiError(500, `Failed to send test message: ${result.error || 'Unknown API error'}`);
        }

        res.json({ message: "Test message sent successfully!", details: result });

    } catch (error) {
        next(error);
    }
};







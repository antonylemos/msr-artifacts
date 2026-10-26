// src/integrations/whatsapp/whatsapp.webhook.service.js
import crypto from 'crypto';
import axios from 'axios'; // For making API calls to Meta
import { ApiError } from '../../api/utils/ApiError.js';
import * as clientService from '../../api/services/client.service.js';
import * as conversationService from '../../api/services/conversation.service.js';
import * as channelConfigService from './whatsapp.channel.service.js';
import * as messageService from '../../api/services/message.service.js'; // For updating message status
import sql from '../../db/sqlClient.js';



const META_GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || 'v22.0'; // Use env var

 const url  = "https://graph.facebook.com/v20.0/677340445453169/messages"

const WHATSAPP_ACCESS_TOKEN = "EAAJGqHk43DIBOxEL8j7ne8K9i7WRvii7ZAsrIrz6yknfbQA6MTmOgWgGuDnFev2MIvYRWBYZBc4NdP5r8hqZBSdmpaH8GokiPg7cXQvrfQPBntYqTWzjNfZBsOzqfkOPFsK49rYGRov9NOUcDtZBYsPXJVPZCgHwp44wRl4qdo1O0LErVZC5KfOFdVMZAkYMqQZDZD"

// --- SENDING LOGIC (FOR META CLOUD API) ---
export const sendWhatsAppMessageViaProvider = async (organizationId, toWhatsAppNumber, fromWhatsAppNumberConfigured, messageContent, messageType = 'text', options = {}) => {
  console.log(`META SENDER: Sending to ${toWhatsAppNumber} from (configured) ${fromWhatsAppNumberConfigured}`);
  const channel = await channelConfigService.getActiveChannelForSending(organizationId, fromWhatsAppNumberConfigured);

  if (!channel || channel.provider !== 'meta_cloud_api') {
    throw new ApiError(500, `No active Meta Cloud API channel configured for ${fromWhatsAppNumberConfigured} or organization ${organizationId}.`);
  }

  if (!channel.metaPhoneNumberId || !channel.metaAccessToken) {
    throw new ApiError(500, "Meta Cloud API channel credentials (Phone Number ID, Access Token) are missing.");
  }

const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${channel.metaPhoneNumberId}/messages`;
  const headers = {
    'Authorization': `Bearer ${channel.metaAccessToken}`,
    'Content-Type': 'application/json',
  };

  let payload;
  const recipientWaId = toWhatsAppNumber.startsWith('+') ? toWhatsAppNumber.substring(1) : toWhatsAppNumber; // Meta expects number without '+'

  if (messageType === 'text') {
    payload = {
      messaging_product: 'whatsapp',
      to: recipientWaId,
      type: 'text',
      text: { preview_url: options.preview_url || false, body: messageContent },
    };
  } else if (messageType === 'template' && options.templateName) {
    payload = {
      messaging_product: 'whatsapp',
      to: recipientWaId,
      type: 'template',
      template: {
        name: options.templateName,
        language: { code: options.languageCode || 'en_US' },
        components: options.components || [], // [{type: "body", parameters: [{type: "text", text: "value"}]}]
      },
    };
  } else if (messageType === 'interactive_reply' && options.interactiveData) { // For sending interactive messages
      payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientWaId,
          type: "interactive",
          interactive: options.interactiveData // e.g., {type: "button", body: {...}, action: {buttons: [...]}}
      };
  } else if (messageType === 'image' && options.mediaUrl) {
      payload = { messaging_product: 'whatsapp', to: recipientWaId, type: 'image', image: { link: options.mediaUrl, caption: messageContent || undefined } };
  } else if (messageType === 'document' && options.mediaUrl) {
      payload = { messaging_product: 'whatsapp', to: recipientWaId, type: 'document', document: { link: options.mediaUrl, filename: options.filename || 'document.pdf', caption: messageContent || undefined } };
  }
  // Add other message types (audio, video, location, contacts) similarly
  else {
    console.error("Unsupported message type or missing options for Meta Cloud API:", messageType);
    return { success: false, error: "Unsupported message type or missing options.", status: 'failed_to_send' };
  }

  try {
    const response = await axios.post(url, payload, { headers });
    console.log('Meta Cloud API message sent successfully, Response:', response.data);
    // response.data.messages[0].id is the wamid
    return { success: true, channelMessageId: response.data?.messages?.[0]?.id, status: 'sent_to_channel' };
  } catch (error) {
    console.error("Meta Cloud API send error:", error.response?.data || error.message);
    const errorData = error.response?.data?.error;
    return { 
        success: false, 
        error: errorData?.message || error.message, 
        errorCode: errorData?.code,
        errorFbTraceId: errorData?.fbtrace_id,
        status: 'failed_to_send' 
    };
  }
};


// --- INCOMING WEBHOOK PROCESSING LOGIC ---
const normalizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return null;
  let cleaned = String(phoneNumber).replace(/\D/g, ''); // Remove non-digits
  // Meta usually provides E.164 format (country code + number)
  if (!cleaned.startsWith('+')) {
    cleaned = `+${cleaned}`; // Ensure '+' for consistency if a raw number without it is somehow passed
  }
  return cleaned;
};



export const processIncomingWhatsAppMessage = async (organizationId, metaEntryChangeValue, yourBusinessDisplayPhoneNumber, yourBusinessMetaPhoneNumberId) => {
  const { contacts, messages, statuses } = metaEntryChangeValue;
  console.log(`[Webhook Service] START: Processing event for Org ${organizationId}`);

  // --- Handle Incoming Messages from a Client ---
  if (messages && messages.length > 0) {
    const messageData = messages[0];
    const clientWaId = normalizePhoneNumber(messageData.from);
    const clientProfileName = contacts?.[0]?.profile?.name;
    const channelMessageId = messageData.id;
    const channelTimestamp = new Date(parseInt(messageData.timestamp, 10) * 1000);

    // 1. Find or Create Client
    const client = await clientService.findOrCreateClient(organizationId, 'whatsappSenderId', clientWaId, {
        name: clientProfileName, profileNameWhatsapp: clientProfileName, phoneNumber: clientWaId, firstInteractionChannel: 'whatsapp',
    });
    console.log(`[Webhook Service] ---> Found/Created Client ID: ${client.id}`);

    // 2. Find or Create Conversation
    let wasNewConversation = false;
    let conversation = await conversationService.findActiveConversationByClient(client.id, organizationId, 'whatsapp', yourBusinessMetaPhoneNumberId);
    if (!conversation) {
        conversation = await conversationService.createConversation({
            organizationId, clientId: client.id, sourceChannel: 'whatsapp',
            whatsappSenderIdSnapshot: clientWaId, externalChannelConversationId: yourBusinessMetaPhoneNumberId,
            status: 'new', initiatedAtUtc: channelTimestamp,
        });
        wasNewConversation = true;
    }

    // 3. Idempotency Check
    const existingMessage = await messageService.getMessageByChannelId(channelMessageId);
    if (existingMessage) {
        console.log(`[Webhook Service] ---> Duplicate message (WAMID: ${channelMessageId}). Ignoring.`);
        return null;
    }
    
    // 4. Add message to conversation
    const content = messageData.text?.body || 'Interactive/Media Message';
    
    // --- THE CRITICAL FIX ---
    // The addMessageToConversation service returns an object { newMessage, updatedConversation }
    // We must capture this entire object to pass back to the controller.
    const addMessageResult = await conversationService.addMessageToConversation(conversation.id, {
        senderType: 'client',
        senderId: client.id,
        senderNameSnapshot: client.name || client.profileNameWhatsapp,
        content,
        messageType: messageData.type,
        channelMessageId,
        clientTimestamp: channelTimestamp,
    });
    
    // 5. Return the complete result, including the newConversation flag
    console.log(`[Webhook Service] ---> Successfully processed message. Returning data to controller.`);
    return { 
        newMessage: addMessageResult.newMessage, 
        updatedConversation: addMessageResult.updatedConversation, 
        newConversation: wasNewConversation 
    };
    // --- END FIX ---
  }

  // --- Handle Status Updates ---
  if (statuses && statuses.length > 0) {
    console.log(`[Webhook Service] -> It's a status update. Ignoring for now.`);
    return null;
  }

  console.log(`[Webhook Service] -> Event is not a message or status. Ignoring.`);
  return null;
};




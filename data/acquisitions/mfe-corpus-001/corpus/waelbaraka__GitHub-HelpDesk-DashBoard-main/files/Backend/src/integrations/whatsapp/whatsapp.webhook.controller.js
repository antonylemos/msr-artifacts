// src/integrations/whatsapp/whatsapp.channel.controller.js
import * as channelService from './whatsapp.channel.service.js';
import { ApiError } from '../../api/utils/ApiError.js';
import sql from '../../db/sqlClient.js';
import * as webhookService from './whatsapp.webhook.service.js';

// Helper for normalizePhoneNumber (if not already in webhookService)
const normalizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return null;
  let cleaned = String(phoneNumber).replace(/\D/g, '');
  if (cleaned.startsWith('whatsapp')) cleaned = cleaned.substring("whatsapp".length);
  if (!cleaned.startsWith('+')) {
    cleaned = `+${cleaned}`;
  }
  return cleaned;
};



export const handleMetaWebhookVerification = async (req, res, next) => {
    const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN; // Store this securely in your .env

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Meta Webhook: VERIFIED');
            res.status(200).send(challenge);
        } else {
            console.warn('Meta Webhook: Verification failed. Mode or token mismatch.');
            res.sendStatus(403);
        }
    } else {
        console.warn('Meta Webhook: Verification GET request missing mode or token.');
        res.sendStatus(400);
    }
};



export const handleIncomingWhatsAppWebhook = async (req, res, next) => {
  try {
    const webhookPayload = req.body;
    console.log(`[Webhook Controller] Received webhook: object is "${webhookPayload.object}"`);
    if (webhookPayload.object !== 'whatsapp_business_account') {
      return res.sendStatus(200); // Acknowledge, but do nothing
    }
    
    for (const entry of webhookPayload.entry) {
      for (const change of entry.changes) {
        if (change.value) {
          const valueObject = change.value;
          const yourBusinessMetaPhoneNumberId = valueObject.metadata?.phone_number_id;

          if (!yourBusinessMetaPhoneNumberId) {
            console.warn("[Webhook Controller] Change value received without phone_number_id. Skipping.");
            continue;
          }
          
          console.log(`[Webhook Controller] -> Processing change for number ID: ${yourBusinessMetaPhoneNumberId}`);
          const channelConfig = await channelService.getChannelByMetaPhoneNumberId(yourBusinessMetaPhoneNumberId);
          if (!channelConfig) {
            console.warn(`[Webhook Controller] -> No active channel found for ${yourBusinessMetaPhoneNumberId}. Skipping.`);
            continue;
          }

          // --- THIS IS THE CORRECTED CALL, NO MORE "..." ---
          const result = await webhookService.processIncomingWhatsAppMessage(
              channelConfig.organizationId, 
              valueObject, 
              valueObject.metadata?.display_phone_number, 
              yourBusinessMetaPhoneNumberId
          );

          // --- THIS IS THE CORRECTED EMISSION LOGIC ---
          if (result && result.updatedConversation) {
            const io = req.app.get('socketio');
            if (io) {
              const organizationId = result.updatedConversation.organizationId;
              const activityPayload = {
                conversation: result.updatedConversation,
                message: result.newMessage || null
              };
              
              console.log(`%c[Socket.IO] EMITTING 'conversation_activity' to organization_${organizationId}`, 'color: green; font-weight: bold;', activityPayload);
              io.to(`organization_${organizationId}`).emit('conversation_activity', activityPayload);
            } else {
              console.warn("[Webhook Controller] Socket.IO instance not found on req.app. Could not emit event.");
            }
          } else {
            console.log("[Webhook Controller] -> Service processed the event, but no socket emission was required (e.g., duplicate message or status update).");
          }
        }
      }
    }
    
    // Always send 200 OK to Meta
    res.sendStatus(200);

  } catch (error) {
    console.error("--- FATAL ERROR in handleIncomingWhatsAppWebhook ---", error);
    // Even on fatal internal error, send 200 OK
    res.sendStatus(200);
  }
};


/**
 * Handles the initial webhook verification challenge from Meta.
 */
export const handleWebhookVerification = (req, res, next) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    console.log("Meta Webhook: VERIFIED");
    res.status(200).send(challenge);
  } else {
    console.warn("Meta Webhook: Verification FAILED.");
    res.sendStatus(403);
  }
};













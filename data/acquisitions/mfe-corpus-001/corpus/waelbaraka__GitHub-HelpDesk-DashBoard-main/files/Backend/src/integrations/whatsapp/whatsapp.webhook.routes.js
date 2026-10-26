// src/integrations/whatsapp/whatsapp.webhook.routes.js
import express from 'express';
import { handleIncomingWhatsAppWebhook } from './whatsapp.webhook.controller.js';
import { handleMetaWebhookVerification } from './whatsapp.webhook.controller.js'; // Add this

const router = express.Router();

// This endpoint MUST be public and typically uses x-www-form-urlencoded for Twilio
// or JSON for Meta Cloud API. Ensure your body parser middleware in index.js handles these.
router.post('/', express.urlencoded({ extended: true }), handleIncomingWhatsAppWebhook); // For Twilio
// For Meta, you'd use express.json() if not globally applied:
// router.post('/meta', express.json(), handleIncomingMetaWebhook);
// router.get('/meta', handleMetaWebhookVerification); // For Meta initial setup
router.get('/', handleMetaWebhookVerification); // Meta uses GET for verification

export default router;
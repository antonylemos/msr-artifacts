// src/integrations/whatsapp/whatsapp.channel.routes.js
import express from 'express';
import isAuthenticated from '../../api/middlewares/isAuthenticated.js'; // Correct path to your middleware
import hasPermission from '../../api/middlewares/hasPermission.js';     // Correct path
import {
  createChannelController,
  listChannelsController,
  getChannelByIdController,
  updateChannelController,
  deleteChannelController,
  sendTestMessageController
} from './whatsapp.channel.controller.js'; // Assuming controller is in the same directory

const router = express.Router();

// All these routes manage sensitive channel configurations, so they require authentication
// and specific permissions.
router.use(isAuthenticated);

// Define a permission for managing WhatsApp channels, e.g., 'whatsapp:manage_channels'
const canManageWhatsAppChannels = hasPermission('whatsapp:manage_channels'); // Or an array ['whatsapp:manage']

router.post('/', canManageWhatsAppChannels, createChannelController);
router.get('/', canManageWhatsAppChannels, listChannelsController);
router.get('/:channelId', canManageWhatsAppChannels, getChannelByIdController);
router.put('/:channelId', canManageWhatsAppChannels, updateChannelController);
router.delete('/:channelId', canManageWhatsAppChannels, deleteChannelController);
router.post('/:channelId/test', canManageWhatsAppChannels, sendTestMessageController); // <-- ADD THIS ROUTE


export default router;
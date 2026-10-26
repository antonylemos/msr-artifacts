// src/api/routes/conversation.routes.js
import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import hasPermission from '../middlewares/hasPermission.js';
import {
  listConversations,
  getConversationById,
  
  addMessageToConversationController,
  listMessagesController,
  updateConversationStatusController,
  assignConversationController
} from '../controllers/conversation.controller.js';

const router = express.Router();
router.use(isAuthenticated);

// Assuming permissions like: 'conversation:read_own', 'conversation:read_all_org', 'message:create_agent'
router.get('/', hasPermission('conversation:read'), listConversations);
router.get('/:conversationId', hasPermission('conversation:read'), getConversationById);
router.get('/:conversationId/messages', hasPermission('conversation:read'), listMessagesController);
router.post('/:conversationId/messages', hasPermission('message:create'), addMessageToConversationController);
router.put('/:conversationId/status', hasPermission('conversation:update_status'), updateConversationStatusController);
router.put('/:conversationId/assign', hasPermission('conversation:assign'), assignConversationController);

export default router;
// src/api/controllers/conversation.controller.js
import * as conversationService from '../services/conversation.service.js';
import * as messageService from '../services/message.service.js'; // For listing messages
import { ApiError } from '../utils/ApiError.js';


export const listConversations = async (req, res, next) => {
    try {
        const { organizationId, id: requestingAgentId } = req.user;
        const { status, agentId, teamId, limit, offset } = req.query;

        const filters = {
            statuses: status ? status.split(',') : [],
            teamId,
        };

        if (agentId === 'me') {
            filters.agentId = requestingAgentId;
        } else if (agentId) {
            filters.agentId = parseInt(agentId, 10);
        }

        const result = await conversationService.listConversations(organizationId, filters, { limit, offset });
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


/**
 * Controller to get a single conversation by its ID.
 */
export const getConversationById = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const conversation = await conversationService.getConversationForSocket(parseInt(conversationId));
        if (!conversation || conversation.organizationId !== req.user.organizationId) {
            return next(new ApiError(404, 'Conversation not found'));
        }
        res.status(200).json(conversation);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to add a new message to a conversation.
 */
export const addMessageToConversationController = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const { id: senderId, fullName, organizationId } = req.user;
        const { content, messageType = 'text', isInternalNote = false } = req.body;

        const message = await conversationService.addMessageToConversation(parseInt(conversationId, 10), {
            senderType: 'agent',
            senderId,
            senderNameSnapshot: fullName,
            content,
            messageType,
            isInternalNote,
        });

        const io = req.app.get('socketio');
        if (io) {
            io.to(`conversation_${conversationId}`).emit('new_message', message);
            const updatedConversation = await conversationService.getConversationForSocket(parseInt(conversationId, 10));
            io.to(`organization_${organizationId}`).emit('conversation_updated', updatedConversation);
        }

        res.status(201).json(message);
    } catch (error)        {
        next(error);
    }
};

/**
 * Controller to assign a conversation to an agent or team.
 */
export const assignConversationController = async (req, res, next) => {
    try {
        const { organizationId, id: agentIdMakingAssignment } = req.user;
        const { conversationId } = req.params;
        const { agentId, teamId } = req.body;

        const updatedConversation = await conversationService.assignConversation(
            parseInt(conversationId, 10), 
            organizationId, 
            { agentId, teamId }, 
            agentIdMakingAssignment
        );

        const io = req.app.get('socketio');
        if (io) {
            io.to(`organization_${organizationId}`).emit('conversation_updated', updatedConversation);
        }

        res.status(200).json(updatedConversation);
    } catch (error) {
        next(error);
    }
};








export const listMessagesController = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { conversationId } = req.params;
    const { page, limit } = req.query; // Add beforeMessageId for cursor pagination later

    const messages = await messageService.listMessagesForConversation(
      parseInt(conversationId),
      organizationId,
      { page: parseInt(page) || 1, limit: parseInt(limit) || 50 }
    );
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const updateConversationStatusController = async (req, res, next) => {
    try {
        const { organizationId, id: agentId } = req.user;
        const { conversationId } = req.params;
        const { status } = req.body;
        if (!status) return next(new ApiError(400, "New status is required."));

        const updatedConversation = await conversationService.updateConversationStatus(parseInt(conversationId), organizationId, status, agentId);
        if (!updatedConversation) return next(new ApiError(404, 'Conversation not found or update failed.'));

        const io = req.app.get('socketio');
        if (io) {
            io.to(`conversation_${conversationId}`).emit('conversation_updated', updatedConversation);
            // Also emit to general agent/team lists if status changes affect list views
        }
        res.json(updatedConversation);
    } catch (error) {
        next(error);
    }
};



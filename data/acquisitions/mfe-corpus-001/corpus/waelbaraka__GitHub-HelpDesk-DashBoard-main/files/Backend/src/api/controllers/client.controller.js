// src/api/controllers/client.controller.js
import * as clientService from '../services/client.service.js';
import { ApiError } from '../utils/ApiError.js'; // Or handle errors more gracefully

export const listClientsController = async (req, res, next) => {
  try {
    const { organizationId } = req.user; // Assuming isAuthenticated middleware populates req.user
    const { page, limit, searchTerm, segment, tags } = req.query;
    const result = await clientService.listClients(organizationId, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      searchTerm,
      segment,
      tags: tags ? tags.split(',') : undefined
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getClientByIdController = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { clientId } = req.params;
    const client = await clientService.getClientById(parseInt(clientId), organizationId);
    if (!client) {
      return next(new ApiError(404, 'Client not found.'));
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
};

export const updateClientController = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { clientId } = req.params;
    const updateData = req.body;
    const updatedClient = await clientService.updateClient(parseInt(clientId), organizationId, updateData);
    if (!updatedClient) {
      return next(new ApiError(404, 'Client not found or update failed.'));
    }
    res.json(updatedClient);
  } catch (error) {
    next(error);
  }
};

export const addNoteToClientController = async (req, res, next) => {
  try {
    const { organizationId, id: agentIdRef, fullName: agentNameSnapshot } = req.user;
    const { clientId } = req.params;
    const { noteText } = req.body;

    if (!noteText) {
        return next(new ApiError(400, "Note text is required."));
    }
    const noteObject = { agentIdRef, agentNameSnapshot, noteText, timestamp: new Date().toISOString() };
    const notes = await clientService.addNoteToClient(parseInt(clientId), organizationId, noteObject);
    if (notes === null) { // Service returns null if client not found
        return next(new ApiError(404, "Client not found."));
    }
    res.status(201).json({ message: "Note added successfully.", notes });
  } catch (error) {
    next(error);
  }
};

// Add other client controllers as needed (e.g., updateClientOptInController)
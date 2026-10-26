// src/api/routes/client.routes.js
import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import hasPermission from '../middlewares/hasPermission.js'; // Assuming you have permission strings
import {
  listClientsController,
  getClientByIdController,
  updateClientController,
  addNoteToClientController
} from '../controllers/client.controller.js';

const router = express.Router();

// All client routes require authentication and organization context
router.use(isAuthenticated);

// Example permissions: 'client:read_all', 'client:update_any', 'client:create_note'
router.get('/', hasPermission(['client:read', 'client:read_all']), listClientsController);
router.get('/:clientId', hasPermission(['client:read', 'client:read_all']), getClientByIdController);
router.put('/:clientId', hasPermission(['client:update', 'client:update_any']), updateClientController);
router.post('/:clientId/notes', hasPermission(['client:create_note', 'client:update_any']), addNoteToClientController);

export default router;
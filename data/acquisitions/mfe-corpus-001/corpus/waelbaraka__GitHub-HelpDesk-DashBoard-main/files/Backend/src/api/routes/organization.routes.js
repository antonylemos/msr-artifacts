// src/api/routes/organization.routes.js
import express from 'express';
import * as organizationController from '../controllers/organization.controller.js';
import hasPermission from '../middlewares/hasPermission.js';

const router = express.Router();

// GET /api/organization - Get details of the current user's organization
router.get('/', hasPermission(['organization_read']), organizationController.getCurrentOrganization);

// PATCH /api/organization - Update details of the current user's organization
router.patch('/', hasPermission(['organization_update']), organizationController.updateCurrentOrganization);

export default router;
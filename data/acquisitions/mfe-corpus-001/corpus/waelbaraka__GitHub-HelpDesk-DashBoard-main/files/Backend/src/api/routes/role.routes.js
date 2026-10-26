// src/api/routes/role.routes.js

import express from 'express';
import * as roleController from '../controllers/role.controller.js';
import hasPermission from '../middlewares/hasPermission.js';

const router = express.Router();

// We can define the permission check once and reuse it.
// 'role_manage' is a good, comprehensive permission for all role-related actions.
const canManageRoles = hasPermission(['role_manage']);

// POST /api/roles - Create a new role
router.post('/', canManageRoles, roleController.createRole);

// GET /api/roles - Get a list of all roles for the organization
router.get('/', canManageRoles, roleController.listRoles);

// GET /api/roles/:id - Get a single role by its ID
router.get('/:id', canManageRoles, roleController.getRoleById);

// PATCH /api/roles/:id - Update an existing role
router.patch('/:id', canManageRoles, roleController.updateRole);

// DELETE /api/roles/:id - Delete a role
router.delete('/:id', canManageRoles, roleController.deleteRole);

export default router;
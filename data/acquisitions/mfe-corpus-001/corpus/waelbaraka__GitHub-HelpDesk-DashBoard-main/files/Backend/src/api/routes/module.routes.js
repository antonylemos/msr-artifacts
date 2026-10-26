// src/api/routes/module.routes.js
import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import hasPermission from '../middlewares/hasPermission.js';
import {
    listAvailableModulesController,
    listInstalledModulesController,
    installModuleController,
    uninstallModuleController,
    getModuleDetailsController
} from '../controllers/moduleInstallation.controller.js';

const router = express.Router();

// Route to list all available modules (for the marketplace)
// This might be public or require basic authentication depending on your design
router.get('/available', isAuthenticated, listAvailableModulesController); 
router.get('/available/:moduleId', isAuthenticated, getModuleDetailsController); 

// The following routes operate on a specific organization's modules
// and require the user to be authenticated and part of that organization.
// Permissions like 'organization:manage_modules' would be appropriate.

const manageOrgModulesPermission = hasPermission('organization:manage_modules');

// List modules installed for the current user's organization
router.get('/installed', isAuthenticated, listInstalledModulesController); 

// Install a module for the current user's organization
router.post('/install', isAuthenticated, manageOrgModulesPermission, installModuleController);

// Uninstall a module for the current user's organization
router.delete('/:moduleId/uninstall', isAuthenticated, manageOrgModulesPermission, uninstallModuleController);


export default router;
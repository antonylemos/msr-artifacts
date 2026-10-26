// src/api/controllers/moduleInstallation.controller.js
import * as moduleInstallationService from '../services/moduleInstallation.service.js';
import * as moduleService from '../services/module.service.js'; // To list available modules
import { ApiError } from '../utils/ApiError.js';

export const listAvailableModulesController = async (req, res, next) => {
    try {
        // This service/function needs to be created if it doesn't exist
        // It would simply do: SELECT id, name, description, version, author FROM "Module" ORDER BY name;
        const modules = await moduleService.listAvailableModules(); 
        res.json(modules);
    } catch (error) {
        next(error);
    }
};

export const listInstalledModulesController = async (req, res, next) => {
    try {
        const { organizationId } = req.user; // Assuming user is authenticated
        const installedModules = await moduleInstallationService.getInstalledModulesForOrganization(organizationId);
        res.json(installedModules);
    } catch (error) {
        next(error);
    }
};

export const installModuleController = async (req, res, next) => {
  try {
    const { organizationId, id: installingUserId } = req.user;
    const { moduleId } = req.body; // Expecting moduleId in the request body

    if (!moduleId) {
      return next(new ApiError(400, "Module ID is required in the request body."));
    }

    const result = await moduleInstallationService.installModuleForOrganization(organizationId, moduleId, installingUserId);
    
    // After successful installation, refetch the user's profile to include the new module list
    // This is important so the client's authStore gets updated immediately
    // This assumes your authService.getProfileData can fetch a full user object
    // const authService = require('../services/auth.service.js'); // Use dynamic import if needed
    // const updatedUserProfile = await authService.getProfileData(installingUserId); // Simplified
    
    res.status(201).json({ 
        message: result.message, 
        module: result.module
        // Optionally return updatedUserProfile.installedModules if you fetch it
    });
  } catch (error) {
    next(error);
  }
};

export const uninstallModuleController = async (req, res, next) => {
    try {
        const { organizationId, id: uninstallingUserId } = req.user;
        const { moduleId } = req.params; // Expecting moduleId in URL path

        const result = await moduleInstallationService.uninstallModuleForOrganization(organizationId, moduleId, uninstallingUserId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};




export const getModuleDetailsController = async (req, res, next) => {
  try {
    const { moduleId } = req.params; // This should match the route param name
    if (!moduleId) {
      return next(new ApiError(400, "Module ID parameter is missing."));
    }
    console.log(`CONTROLLER: Fetching details for moduleId: ${moduleId}`); // Add log

    const moduleDetails = await moduleService.getModuleDetailsById(moduleId);
    
    if (!moduleDetails) {
      console.log(`CONTROLLER: Module ${moduleId} not found by service.`); // Add log
      return next(new ApiError(404, `Module with ID "${moduleId}" not found.`));
    }
    
    console.log(`CONTROLLER: Module ${moduleId} found, sending details.`); // Add log
    res.json(moduleDetails);
  } catch (error) {
    console.error(`CONTROLLER ERROR for moduleId ${req.params.moduleId}:`, error); // Add log
    next(error);
  }
};






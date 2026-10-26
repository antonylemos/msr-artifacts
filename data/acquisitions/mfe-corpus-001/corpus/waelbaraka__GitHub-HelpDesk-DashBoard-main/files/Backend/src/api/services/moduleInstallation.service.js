// src/api/services/moduleInstallation.service.js
import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Installs a module for a given organization.
 * - Checks if the module exists.
 * - Checks if it's already installed.
 * - Creates an installation record.
 * - Grants default permissions associated with the module to Admin/Owner roles.
 */
export const installModuleForOrganization = async (organizationId, moduleId, installingUserId) => {
  if (!organizationId || !moduleId) {
    throw new ApiError(400, "Organization ID and Module ID are required.");
  }

  return await sql.begin(async sqlTx => {
    // 1. Verify Module Exists
    const [moduleToInstall] = await sqlTx`
      SELECT id, name, "requiredPermissions" 
      FROM "Module" 
      WHERE id = ${moduleId};
    `;
    if (!moduleToInstall) {
      throw new ApiError(404, `Module with ID "${moduleId}" not found.`);
    }

    // 2. Check if Already Installed for this Organization
    const [existingInstallation] = await sqlTx`
      SELECT "moduleId" FROM "OrganizationModuleInstallation"
      WHERE "organizationId" = ${organizationId} AND "moduleId" = ${moduleId};
    `;
    if (existingInstallation) {
      // Optionally, if it was disabled, re-enable it. For now, just inform.
      // await sqlTx`UPDATE "OrganizationModuleInstallation" SET "isEnabled" = true WHERE "organizationId" = ${organizationId} AND "moduleId" = ${moduleId}`;
      // console.log(`Module ${moduleId} already installed for organization ${organizationId}. Ensured it's enabled.`);
      // return { message: `Module "${moduleToInstall.name}" is already installed.`, module: moduleToInstall, existed: true };
      throw new ApiError(409, `Module "${moduleToInstall.name}" is already installed for this organization.`);
    }

    // 3. Create Installation Record
    const [installation] = await sqlTx`
      INSERT INTO "OrganizationModuleInstallation" (
        "organizationId", "moduleId", "isEnabled", "installedAt"
      ) VALUES (
        ${organizationId}, ${moduleId}, true, NOW()
      ) RETURNING *;
    `;

    // 4. Grant Default Permissions (to 'Owner' and 'Admin' roles of this organization)
    const requiredPermissions = moduleToInstall.requiredPermissions || [];
    if (requiredPermissions.length > 0) {
      const rolesToUpdate = await sqlTx`
        SELECT id, name, permissions 
        FROM "Role" 
        WHERE "organizationId" = ${organizationId} AND name IN ('Owner', 'Admin') AND "isSystemRole" = true;
      `;

      for (const role of rolesToUpdate) {
        const currentPermissions = role.permissions || {};
        let permissionsChanged = false;
        requiredPermissions.forEach(perm => {
          if (!currentPermissions[perm]) {
            currentPermissions[perm] = true;
            permissionsChanged = true;
          }
        });

        if (permissionsChanged) {
          await sqlTx`
            UPDATE "Role" 
            SET permissions = ${sqlTx.json(currentPermissions)}, "updatedAt" = NOW()
            WHERE id = ${role.id};
          `;
          console.log(`Granted module permissions to role "${role.name}" (ID: ${role.id}) for module ${moduleId}`);
        }
      }
    }
    
    // Optionally, log this action in an audit log
    // auditLogService.logAction(installingUserId, organizationId, 'module_installed', { moduleId, moduleName: moduleToInstall.name });


    console.log(`Module ${moduleId} successfully installed for organization ${organizationId}.`);
    return { 
        message: `Module "${moduleToInstall.name}" installed successfully.`, 
        installation, 
        module: moduleToInstall,
        existed: false
    };
  });
};

/**
 * Uninstalls a module for a given organization.
 * (Permissions are typically NOT automatically revoked on uninstall,
 * as admins might have manually adjusted them or other modules might share permissions.
 * This can be a policy decision.)
 */
export const uninstallModuleForOrganization = async (organizationId, moduleId, uninstallingUserId) => {
    // ... Similar logic: check existence, delete from OrganizationModuleInstallation ...
    // ... Consider if disabling is better than deleting, or what happens to module-specific settings ...
    const [deleted] = await sql`
        DELETE FROM "OrganizationModuleInstallation"
        WHERE "organizationId" = ${organizationId} AND "moduleId" = ${moduleId}
        RETURNING "moduleId";
    `;
    if (!deleted) {
        throw new ApiError(404, `Module "${moduleId}" not found or not installed for this organization.`);
    }
    // auditLogService.logAction(uninstallingUserId, organizationId, 'module_uninstalled', { moduleId });
    return { message: `Module "${moduleId}" uninstalled successfully.` };
};

/**
 * Fetches all installed modules for a given organization.
 * This is used by the auth service to populate user.installedModules.
 */
export const getInstalledModulesForOrganization = async (organizationId) => {
  if (!organizationId && organizationId !== 0) {
      console.warn("MODULE_INSTALL_SERVICE (getInstalled): organizationId is undefined, null, or invalid. Returning [].");
      return [];
  }
  console.log(`MODULE_INSTALL_SERVICE (getInstalled): Fetching installed modules for organizationId: ${organizationId} (type: ${typeof organizationId})`);
  
  const modulesFromDb = await sql`
    SELECT 
      m.id, 
      m.name, 
      m.description, 
      m.version, 
      m.author,
      m."uiComponents", 
      m."logoUrl",             -- Added based on seed and frontend needs
      m."shortDescription",    -- Added
      m.category,              -- Added
      m.tags,                  -- Added
      m."paymentTypes",        -- Added
      m."averageRating",       -- Added
      m."reviewCount",         -- Added
      m."worksWithText",       -- Added
      m."getButtonText"        -- Added
      -- Select ALL fields from "Module" that your frontend (PrimarySidebar, AppDetailsPage, ExploreAppsPage) needs
    FROM 
      "Module" m  -- Querying the "Module" table, aliased as 'm'
    JOIN 
      "OrganizationModuleInstallation" omi ON m.id = omi."moduleId" -- Joining with "OrganizationModuleInstallation", aliased as 'omi'
    WHERE 
      omi."organizationId" = ${organizationId} AND omi."isEnabled" = true
    ORDER BY 
      m.name;
  `;
  
  console.log(`MODULE_INSTALL_SERVICE (getInstalled): Raw DB result for org ${organizationId}: ${modulesFromDb.count} modules found.`);
  if (modulesFromDb.count > 0) {
      console.log("First found module raw:", JSON.stringify(modulesFromDb[0], null, 2));
  }
  
  if (!modulesFromDb || modulesFromDb.length === 0) {
      console.log(`MODULE_INSTALL_SERVICE (getInstalled): No enabled modules found in DB for org ${organizationId}.`);
      return [];
  }

  return modulesFromDb.map(mod => {
    let parsedUiComponents = mod.uiComponents;
    if (typeof mod.uiComponents === 'string') {
      try {
        parsedUiComponents = JSON.parse(mod.uiComponents);
      } catch (e) {
        console.error(`Error parsing uiComponents for module ${mod.id} in org ${organizationId}:`, e, mod.uiComponents);
        parsedUiComponents = {}; 
      }
    }
    const finalMod = { 
        ...mod, 
        uiComponents: parsedUiComponents || {} 
    };
    // console.log(`MODULE_INSTALL_SERVICE (getInstalled): Processed module ${finalMod.id} for sidebarRelevantData:`, 
    //     JSON.parse(JSON.stringify(finalMod.uiComponents?.sidebar || {}))
    // );
    return finalMod;
  });
};



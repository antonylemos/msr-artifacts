// src/api/middlewares/hasPermission.js
import { ApiError } from '../utils/ApiError.js'; // Assuming you have this utility

const hasPermission = (requiredPermissionsArray) => {
  // Ensure requiredPermissionsArray is always an array, even if a single string is passed
  const permissionsToCheck = Array.isArray(requiredPermissionsArray)
    ? requiredPermissionsArray
    : [requiredPermissionsArray];

  return (req, res, next) => {
    // console.log('hasPermission - Required:', permissionsToCheck);
    // console.log('hasPermission - User received for check:', JSON.stringify({ ...req.user, effectivePermissions: req.user && req.user.effectivePermissions ? Array.from(req.user.effectivePermissions) : null }, null, 2));

    const userPermissions = req.user?.effectivePermissions; // This should be a Set

    if (!userPermissions || !(userPermissions instanceof Set) || userPermissions.size === 0) {
      // If system:all is also missing, it's a definitive no.
      // (The check below for system:all would handle it if it exists)
      console.warn('hasPermission - Denied: User has no effective permissions or effectivePermissions is not a Set.');
      return next(new ApiError(403, "Forbidden: You do not have the necessary permissions (no permissions found)."));
    }

    // Check for "system:all" first (typical for Owner/SuperAdmin)
    if (userPermissions.has("system:all")) {
      // console.log('hasPermission - Granted: User has system:all');
      return next();
    }

    // Check if user has all of the required permissions for this specific route
    const hasAllRequired = permissionsToCheck.every(perm => {
      const hasPerm = userPermissions.has(perm);
      // if (!hasPerm) {
      //   console.log(`hasPermission - Denied: Missing required permission: ${perm}`);
      // }
      return hasPerm;
    });
    
    if (hasAllRequired) {
      // console.log('hasPermission - Granted: User has all required specific permissions.');
      return next();
    }
    
    // console.log('hasPermission - Denied: Default fallthrough. Missing one or more of:', permissionsToCheck);
    return next(new ApiError(403, "Forbidden: You do not have the required permissions to perform this action."));
  };
};

export default hasPermission;
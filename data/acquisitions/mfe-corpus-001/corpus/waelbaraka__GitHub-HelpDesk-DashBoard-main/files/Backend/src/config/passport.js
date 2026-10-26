// src/config/passport.js

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import authService from '../api/services/auth.service.js'; // Import your authService

// --- Local Strategy (Handles Email/Password Login) ---
// This strategy is triggered by `passport.authenticate('local')`.

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      console.log("PASSPORT LOCAL STRATEGY: Authenticating email:", email);
      // --- KEY CHANGE: Delegate to authService.loginUser ---
      // authService.loginUser should:
      // 1. Find user by email.
      // 2. Compare hashed password.
      // 3. Fetch roles, organization.
      // 4. Fetch installedModules.
      // 5. Return the full, sanitized user object, or throw ApiError if auth fails.
      const user = await authService.loginUser({ email, password }); // Pass email and password

      // authService.loginUser will throw ApiError for invalid creds, account issues etc.
      // If it returns a user object, authentication was successful.
      console.log("PASSPORT LOCAL STRATEGY: authService.loginUser returned user:", user ? user.id : "null");
      return done(null, user); // Pass the complete user object (with installedModules)

    } catch (error) {
      console.error("PASSPORT LOCAL STRATEGY: Error:", error.message);
      if (error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403)) {
        // For login failures (invalid creds, inactive account), pass error message to passport
        return done(null, false, { message: error.message });
      }
      // For other unexpected errors (e.g., database connection issue from service)
      return done(error);
    }
  }
));

passport.use(new JwtStrategy(
  jwtOptions,
  async (jwt_payload, done) => {
    try {
      const userIdFromToken = jwt_payload.sub;
      if (!userIdFromToken) {
        console.error("Error in JwtStrategy: No user ID (sub) in JWT payload.");
        return done(null, false); // Invalid token payload
      }

      // --- KEY CHANGE: Use authService.getProfileData ---
      // This service method now fetches user, roles, organization, AND installedModules
      const userProfile = await authService.getProfileData(userIdFromToken); 
      // --- END KEY CHANGE ---

      if (userProfile && userProfile.isActiveAccount && !userProfile.isBanned) {
        // userProfile already has roles, organization, and installedModules attached by the service
        // It should also already be sanitized (no hashedPassword)
        
        // Construct effectivePermissions based on userProfile.roles and userProfile.permissionOverrides
        let effectivePermissions = new Set();
        if (userProfile.roles && Array.isArray(userProfile.roles)) {
            userProfile.roles.forEach(role => {
                if (role.permissions && typeof role.permissions === 'object' && role.permissions !== null) {
                    // Handle system:all specifically if present
                    if (role.permissions['system:all'] === true) {
                        effectivePermissions.add('system:all');
                    }
                    // Add all other true permissions
                    Object.keys(role.permissions).forEach(permissionKey => {
                        if (role.permissions[permissionKey] === true) {
                            effectivePermissions.add(permissionKey);
                        }
                    });
                }
            });
        }
        // Apply permissionOverrides (if any)
        if (userProfile.permissionOverrides && typeof userProfile.permissionOverrides === 'object' && userProfile.permissionOverrides !== null) {
             Object.keys(userProfile.permissionOverrides).forEach(permissionKey => {
                if (userProfile.permissionOverrides[permissionKey] === true) {
                    effectivePermissions.add(permissionKey); // Add override
                } else if (userProfile.permissionOverrides[permissionKey] === false) {
                    effectivePermissions.delete(permissionKey); // Revoke via override
                }
            });
        }
        // Attach the Set of effective permissions to the user object for hasPermission middleware
        userProfile.effectivePermissions = effectivePermissions;


        return done(null, userProfile); // Pass the full userProfile (with installedModules)
      } else {
        let reason = "User not found or inactive/banned.";
        if (userProfile && !userProfile.isActiveAccount) reason = "Account is inactive.";
        if (userProfile && userProfile.isBanned) reason = "Account is banned.";
        console.warn(`JwtStrategy: Authentication failed for user ID ${userIdFromToken}. Reason: ${reason}`);
        return done(null, false);
      }
    } catch (error) {
      console.error("Error in JwtStrategy:", error);
      return done(error, false);
    }
  }
));
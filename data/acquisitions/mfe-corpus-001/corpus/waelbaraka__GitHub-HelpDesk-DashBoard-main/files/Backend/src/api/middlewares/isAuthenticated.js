// src/api/middlewares/isAuthenticated.js
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../utils/ApiError.js';

const prisma = new PrismaClient();

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'Unauthorized: Authentication token is required in Bearer format.');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new ApiError(401, 'Unauthorized: Token not found after Bearer prefix.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded JWT Payload:', decoded); // Good for debugging

        // --- THIS IS THE FIX ---
        // Use decoded.sub instead of decoded.userId
        const userIdFromToken = decoded.sub; 
        // --- END FIX ---

        if (!userIdFromToken || typeof userIdFromToken !== 'number') { // Or check if it's a string that needs parsing
            console.error('isAuthenticated Error: Invalid or missing user identifier (sub) in JWT payload.', decoded);
            throw new ApiError(401, 'Unauthorized: Invalid token payload (missing or invalid user identifier).');
        }

        const userFromDb = await prisma.user.findUnique({
            where: { id: userIdFromToken }, // Use the corrected identifier
            include: {
                roles: {
                    select: {
                        id: true,
                        name: true,
                        permissions: true
                    }
                },
                organization: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if (!userFromDb || !userFromDb.isActiveAccount || userFromDb.isBanned) {
            // ... (error handling for user not found, inactive, banned)
            let message = 'Unauthorized: User not found or account inactive/banned.';
            if (userFromDb && !userFromDb.isActiveAccount) message = 'Unauthorized: Account is inactive.';
            if (userFromDb && userFromDb.isBanned) message = 'Unauthorized: Account is banned.';
            throw new ApiError(401, message);
        }

        let effectivePermissions = new Set();
        // ... (your existing logic to aggregate effectivePermissions - this part was good)
        if (userFromDb.roles && Array.isArray(userFromDb.roles)) {
            userFromDb.roles.forEach(role => {
                if (role.permissions && typeof role.permissions === 'object' && role.permissions !== null) {
                    if (role.permissions['system:all'] === true) {
                        effectivePermissions.add('system:all');
                    }
                    Object.keys(role.permissions).forEach(permissionKey => {
                        if (role.permissions[permissionKey] === true) {
                            effectivePermissions.add(permissionKey);
                        }
                    });
                }
            });
        }
        if (userFromDb.permissionOverrides && typeof userFromDb.permissionOverrides === 'object' && userFromDb.permissionOverrides !== null) {
             Object.keys(userFromDb.permissionOverrides).forEach(permissionKey => {
                if (userFromDb.permissionOverrides[permissionKey] === true) {
                    effectivePermissions.add(permissionKey);
                } else if (userFromDb.permissionOverrides[permissionKey] === false) {
                    effectivePermissions.delete(permissionKey);
                }
            });
        }
        // ...

        req.user = {
            id: userFromDb.id, // Use id from database record
            email: userFromDb.email,
            organizationId: userFromDb.organizationId,
            // ... other fields ...
            roles: userFromDb.roles.map(r => ({ id: r.id, name: r.name })),
            effectivePermissions: effectivePermissions
        };
        
        next();
    } catch (err) {
        // ... (your existing error handling for JWT errors) ...
        console.error("Authentication Middleware Error:", err.name, err.message);
        if (err instanceof ApiError) { return next(err); }
        if (err.name === 'JsonWebTokenError') { return next(new ApiError(401, 'Unauthorized: Invalid token.')); }
        if (err.name === 'TokenExpiredError') { return next(new ApiError(401, 'Unauthorized: Token has expired.'));}
        return next(new ApiError(500, 'Authentication failed.'));
    }
};

export default isAuthenticated;
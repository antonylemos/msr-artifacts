// src/api/controllers/auth.controller.js
import passport  from'passport';
import  { PrismaClient } from '@prisma/client'; // For unique email check

const prisma = new PrismaClient(); // Or import your shared Prisma instance
import authService from '../services/auth.service.js';

export const registerOwner = async (req, res, next) => {
  try {
    const { organizationName, firstName, lastName, email, password } = req.body;
    
    if (!organizationName || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required for registration." });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Check if email already exists using raw SQL (authService should provide a method for this)
    // For now, assuming authService.registerOwnerAndOrganization handles this check internally.
    // If not, you'd call something like:
    // const isEmailTaken = await authService.checkEmailExists(email.toLowerCase());
    // if (isEmailTaken) {
    //     return res.status(409).json({ message: "Email already registered." });
    // }


    const result = await authService.registerOwnerAndOrganization({
      organizationName,
      ownerFirstName: firstName,
      ownerLastName: lastName,
      ownerEmail: email,
      ownerPassword: password,
    });

    // The user object from registerOwnerAndOrganization should also include installedModules (likely empty for new org)
    const token = authService.generateToken(result.user); 
    
    // result.user is already sanitized by authService.registerOwnerAndOrganization if done correctly
    // It should also have an (empty) installedModules array
    res.status(201).json({ 
        message: "Organization and Owner registered successfully!", 
        user: result.user, // This user object should be complete
        organization: result.organization,
        token 
    });
  } catch (error) {
    console.error("Registration Controller Error:", error);
    // Handle PostgreSQL unique violation code if service doesn't translate it to ApiError
    if (error.code === '23505' && error.constraint) { 
        if (error.constraint.includes('User_email_key') || error.constraint.includes('user_email_key')) {
            return res.status(409).json({ message: "Email already registered." });
        }
        if (error.constraint.includes('Organization_name_key') || error.constraint.includes('organization_name_key')) {
             return res.status(409).json({ message: "Organization name already taken." });
        }
        return res.status(409).json({ message: "Registration conflict. A unique value already exists." });
    }
    if (error instanceof ApiError) { // If service throws ApiError
        return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

// --- login Controller (Ensure user object from passport includes installedModules) ---
export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, userFromPassport, info) => { // userFromPassport is from authService.loginUser
    if (err) {
      return next(err);
    }
    if (!userFromPassport) {
      return res.status(401).json({ message: info?.message || "Login failed. Please check your credentials." });
    }
    
    // userFromPassport here comes from authService.loginUser, which *now* includes installedModules
    const token = authService.generateToken(userFromPassport); 
    
    // The userFromPassport should already be sanitized and complete from the service
    res.json({ message: "Login successful!", user: userFromPassport, token });
  })(req, res, next);
};

export const getProfile = (req, res, next) => { // Added next for consistency
  // req.user is now populated by the updated JWT strategy, 
  // which calls authService.getProfileData().
  // So, req.user already contains the full profile including roles, organization, and installedModules.
  // It should also already be sanitized (no sensitive fields like hashedPassword).
  if (!req.user) {
    // This case should ideally be caught by passport.authenticate('jwt') itself,
    // but as a safeguard:
    return next(new ApiError(401, "Authentication required. No user profile found in request."));
  }
  
  // The req.user object IS the profile data.
  res.json({ message: "Profile data retrieved!", profile: req.user });
};


const sanitizeUser = (user) => {
  if (!user) return null;
  // eslint-disable-next-line no-unused-vars
  const { hashedPassword, invitationToken, passwordResetToken, passwordResetExpires, invitationExpires, twoFactorSecret, ...sanitized } = user;
  return sanitized;
};

export const acceptInvitationController = async (req, res, next) => {
  try {
    // --- GET TOKEN FROM req.params ---
    const { token } = req.params; 
    // --- GET OTHER DATA FROM req.body ---
    const { password, firstName, lastName } = req.body;

    // Validation
    if (!token) {
        // This case should ideally not be hit if the route requires :token
        // but good as a defensive check if the route was somehow matched without it.
        throw new ApiError(400, "Invitation token is missing in the URL.");
    }
    if (!password) {
      throw new ApiError(400, "Password is required.");
    }
    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long.");
    }
    // firstName and lastName are optional for this call, service can handle if they are undefined

    const servicePayload = { token, password };
    if (firstName) servicePayload.firstName = firstName;
    if (lastName) servicePayload.lastName = lastName;

    console.log("CONTROLLER: acceptInvitation called with token:", token, "and payload:", {password: '***', firstName, lastName});

    // After accepting, the user is usually not logged in immediately.
    const user = await authService.acceptInvitationService(servicePayload);
    
    // They are redirected to the login page.
    // If you want to auto-login, you'd generate a JWT here.
    res.json({ 
        message: "Invitation accepted successfully! Your account is now active. Please log in.", 
        user: sanitizeUser(user) // Send back sanitized user data
    });
  } catch (error) {
    console.error("Accept Invitation Controller Error:", error);
    next(error);
  }
};

export default {
  registerOwner,
  login,
  getProfile,
  acceptInvitationController
};
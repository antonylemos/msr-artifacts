// src/api/routes/auth.routes.js
import express from 'express';
import authController from '../controllers/auth.controller.js';
import passport from 'passport'; // Required for passport.authenticate middleware
// const { validateRegistration, validateLogin } = require('../validators/auth.validator.js'); // Example for validation middleware

const router = express.Router();

// POST /api/auth/register-owner
// Potentially add validation middleware: router.post('/register-owner', validateRegistration, authController.registerOwner);
router.post('/register-owner', authController.registerOwner);

// Potentially add validation middleware: router.post('/login', validateLogin, authController.login);
router.post('/login', authController.login);

// GET /api/auth/profile (Example protected route)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }), // This middleware protects the route
  authController.getProfile
);

router.post('/accept-invitation/:token', authController.acceptInvitationController);

// Future routes:
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.get('/verify-email/:token', authController.verifyEmail);
// router.post('/invite-user', passport.authenticate('jwt', { session: false }), /* hasPermission(['manage_users']), */ authController.inviteUser);
// router.post('/accept-invitation', authController.acceptInvitation);

export default router;
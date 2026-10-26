// hospital-api-backend/index.js

// 1. Load Environment Variables
// Must be at the very top to ensure all other modules have access to process.env

import 'dotenv/config'; // dotenv has a special import for this
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import './config/passport.js'; // This style of import for side-effects still works
import authRoutes from './api/routes/auth.routes.js';
import roleRoutes from './api/routes/role.routes.js';
import userRoutes from './api/routes/user.routes.js';
import isAuthenticated from './api/middlewares/isAuthenticated.js';
import organizationRoutes from './api/routes/organization.routes.js';
import teamRoutes from './api/routes/team.routes.js';

// 4. Initialize Core Objects
const prisma = new PrismaClient({
});
const app = express();

// 5. Global Middleware Stack (Order Matters)
// ---------------------------------------------

// Sets various security-related HTTP headers to protect against common vulnerabilities.
app.use(helmet()); 

// Enables Cross-Origin Resource Sharing (CORS) so your frontend can communicate with this backend.
// Configure the origin properly for production environments.
app.use(cors({ 
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Parses incoming requests with JSON payloads. This is crucial for POST/PUT requests.
app.use(express.json());

// Parses incoming requests with URL-encoded payloads (e.g., from standard HTML forms).
app.use(express.urlencoded({ extended: true }));

// HTTP request logger for development. Provides detailed logs of incoming requests in the console.
// For production, you might switch this out for a more robust logger like Winston.
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Initialize Passport middleware. This must be done before using passport.authenticate in your routes.
app.use(passport.initialize());

// 6. API Routes
// ---------------------------------------------

// A simple health check endpoint to verify that the server is up and running.
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    message: 'Backend server is healthy and running!',
    timestamp: new Date().toISOString()
  });
});

// Mount the authentication routes on the '/api/auth' path.
app.use('/api/auth', authRoutes);


app.use('/api/users', isAuthenticated, userRoutes);

app.use('/api/roles', isAuthenticated, roleRoutes); // <-- Mount the new routes

app.use('/api/teams', isAuthenticated, teamRoutes);

//app.use('/api/teams', isAuthenticated, teamRoutes);

app.use('/api/organization', isAuthenticated, organizationRoutes);

// 7. Global Error Handling Middleware
// ---------------------------------------------
// This must be the LAST `app.use()` call. It catches any errors passed by `next(error)`.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("--- Global Error Handler ---");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("--- End Global Error Handler ---");

  // Customize error response based on error type for better client-side handling
  // For example, handle Prisma-specific errors
  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') { // Unique constraint violation
      return res.status(409).json({ message: 'A record with this value already exists.', details: `Unique constraint failed on the fields: (${err.meta.target.join(', ')})` });
    }
    // Add other Prisma error codes as needed
  }
  
  if (err.isOperational) { // For custom, operational errors you might throw
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Generic fallback for all other errors
  res.status(500).json({ 
    message: 'An unexpected error occurred on the server.' 
  });
});

// Handle 404 Not Found for any routes not matched above
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found: The requested resource could not be found." });
});

export default app;

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
import { createServer } from 'http'; // Node.js native http module
import { Server } from 'socket.io';


import './src/config/passport.js'; // This style of import for side-effects still works
import authRoutes from './src/api/routes/auth.routes.js';
import roleRoutes from './src/api/routes/role.routes.js';
import userRoutes from './src/api/routes/user.routes.js';
import isAuthenticated from './src/api/middlewares/isAuthenticated.js';
import organizationRoutes from './src/api/routes/organization.routes.js';
import teamRoutes from './src/api/routes/team.routes.js';
import clientRoutes from './src/api/routes/client.routes.js'; // Add this
import conversationRoutes from './src/api/routes/conversation.routes.js'; // Add this
import whatsAppWebhookRoutes from './src/integrations/whatsapp/whatsapp.webhook.routes.js';
import whatsAppChannelRoutes from './src/integrations/whatsapp/whatsapp.channel.routes.js';
import moduleRoutes from './src/api/routes/module.routes.js'; // Add this
import replySnippetRoutes from './src/api/routes/reply-snippet.routes.js';
import tagRoutes from './src/api/routes/tag.routes.js'; // <-- Import the new routes


import { sendWhatsAppMessageViaProvider } from './src/integrations/whatsapp/whatsapp.webhook.service.js';


     


// 4. Initialize Core Objects
const prisma = new PrismaClient({
});
const app = express();
const httpServer = createServer(app); // Create HTTP server from Express app
const io = new Server(httpServer, { // Attach Socket.IO to the HTTP server
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow frontend origin
    methods: ["GET", "POST"]
  }
});





// Make io instance available to other parts of the app (like controllers/services)
app.set('socketio', io);

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


app.use('/api/clients', clientRoutes); // Add this
app.use('/api/conversations', conversationRoutes); // Add this


app.use('/webhooks/whatsapp', whatsAppWebhookRoutes); // Example path
app.use('/api/integrations/whatsapp/channels', isAuthenticated, whatsAppChannelRoutes);

app.use('/api/modules', moduleRoutes); // Add this, isAuthenticated is handled within the router

app.use('/api/reply-snippets', isAuthenticated, replySnippetRoutes);

app.use('/api/tags', isAuthenticated, tagRoutes);


app.post('/api/test/send-whatsapp', async (req, res, next) => { // Added next for error handling
    const { to, message, organizationId, fromNumber } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: 'Missing "to" (recipient phone number) or "message" in body.' });
    }

    // For testing, allow organizationId and fromNumber to be passed, or use defaults from .env
    const orgIdToUse = organizationId ? parseInt(organizationId) : 3; // Default to org 1 if not provided
    const senderNumberToUse = fromNumber || process.env.META_TEST_SENDER_PHONE_NUMBER;

    if (isNaN(orgIdToUse)) {
        return res.status(400).json({ error: 'Invalid organizationId. Must be an integer.' });
    }
    if (!senderNumberToUse) {
        return res.status(400).json({ error: 'Missing "fromNumber" in body or META_TEST_SENDER_PHONE_NUMBER in .env.' });
    }

    try {
        console.log(`TEST ROUTE: Attempting send from ${senderNumberToUse} to ${to} for org ${orgIdToUse}`);
        const result = await sendWhatsAppMessageViaProvider(
            orgIdToUse,           // organizationId (integer)
            to,                   // toWhatsAppNumber (string)
            senderNumberToUse,    // fromWhatsAppNumberConfigured (string) - your business WA number
            message               // messageContent (string)
        );
        res.json(result);
    } catch (error) {
        // Pass the error to the global error handler
        // So it uses the consistent error response format
        next(error); 
    }
});

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


// This will catch any request that doesn't match a route above it.
app.use((req, res, next) => {
  // Create an error object and pass it to the global error handler
  const error = new ApiError(404, "Not Found: The requested resource could not be found on this server.");
  next(error);
});
// --- END ADD ---


// --- Your Global Error Handling Middleware should be the VERY LAST app.use() call ---
app.use((err, req, res, next) => {
  console.error("--- Global Error Handler ---");
  // ... (your existing global error handler logic)
  res.status(err.statusCode || 500).json({ message: err.message || 'An unexpected error occurred.' });
});

// Socket.IO Connection Logic (Basic Example)
io.on('connection', (socket) => {
  console.log('🔌 Socket.IO: A user connected', socket.id);
  
  // --- ADD THIS MISSING LISTENER ---
  socket.on('join_organization_room', (organizationId) => {
    if (organizationId) {
      const roomName = `organization_${organizationId}`;
      socket.join(roomName);
      console.log(`Socket ${socket.id} successfully joined room: ${roomName}`);
    }
  });
  // --- END ADD ---

  socket.on('join_conversation_room', (conversationId) => {
    if (conversationId) {
      const roomName = `conversation_${conversationId}`;
      console.log(`Socket ${socket.id} joining room: ${roomName}`);
      socket.join(roomName);
    }
  });

  socket.on('leave_conversation_room', (conversationId) => {
    if (conversationId) {
      const roomName = `conversation_${conversationId}`;
      console.log(`Socket ${socket.id} leaving room: ${roomName}`);
      socket.leave(roomName);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Socket.IO: User disconnected', socket.id);
  });
});

// 8. Start the Server
// ---------------------------------------------
const PORT = process.env.PORT || 3001;

const server = httpServer.listen(PORT, async () => { // NEW
    try {
        // ... (prisma.$connect if you were still using it, or other DB connection checks) ...
        console.log(`🚀 Backend server (with Socket.IO) running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
    } catch (error) {
        console.error("❌ Failed to start the server:", error);
        process.exit(1);
    }
});


// 9. Graceful Shutdown
// ---------------------------------------------
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
signals.forEach(signal => {
  process.on(signal, async () => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    
    server.close(async () => {
      console.log("✅ HTTP server closed.");
      await prisma.$disconnect();
      console.log("✅ Prisma Client disconnected.");
      process.exit(0);
    });
  });
});
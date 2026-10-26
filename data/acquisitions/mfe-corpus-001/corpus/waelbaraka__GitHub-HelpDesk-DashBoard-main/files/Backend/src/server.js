import app from './app.js'; // the express app
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to the database via Prisma.");
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to the database or start the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
});

// Graceful shutdown, etc...

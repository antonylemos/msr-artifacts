// pg-migrate-config.js
require('dotenv').config(); // Load .env file for database credentials

module.exports = {
  // Connection string or individual parameters
  databaseUrl: process.env.DATABASE_URL, // Recommended: use the same DATABASE_URL Prisma uses
  // OR individual parameters:
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT || "5432"),
  // database: process.env.DB_NAME,
  // ssl: process.env.NODE_ENV === 'production' || process.env.DB_SSL_REQUIRED === 'true' 
  //      ? { rejectUnauthorized: false } // Adjust for Neon or other SSL needs
  //      : false,

  migrationsTable: 'pgmigrations', // Name of the table to track migrations (default)
  dir: 'src/db/migrations',      // Directory to store your SQL migration files
  direction: 'up',               // Default direction
  count: Infinity,               // How many migrations to run by default
  checkOrder: false,             // If true, migration files must be run in order
  verbose: true,                 // Output more details
  // Create schema if it doesn't exist (useful for some setups, often not needed if schema exists)
  // createSchema: true, 
  // Create migrations table if it doesn't exist
  // createMigrationsTable: true, 
};
// Backend/tests/setupGlobal.js
import { execSync } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path'; // To ensure correct path to prisma CLI

const execSyncPromise = promisify(execSync);

export default async () => {
  console.log('\nSetting up test environment...');

  // 1. Define Test Database URL (ensure this is different from your dev/prod DB)
  // IMPORTANT: This database MUST exist and be accessible by the credentials provided.
  // For local testing, you might need to create this database manually first.
  process.env.DATABASE_URL_TEST = process.env.DATABASE_URL_TEST || 'postgresql://testuser:testpass@localhost:5432/testappdb_jest';
  process.env.DATABASE_URL = process.env.DATABASE_URL_TEST; // Prisma uses DATABASE_URL

  console.log(`Test Database URL set to: ${process.env.DATABASE_URL}`);

  // 2. Resolve path to Prisma CLI (important if running tests from different directories or in CI)
  // This assumes prisma is a dev dependency and accessible via npx
  const prismaBinary = resolve(process.cwd(), 'node_modules/.bin/prisma');

  try {
    // 3. Ensure the test database is clean and schema is up-to-date
    // Using `migrate reset` is often better for tests as it clears data and reapplies migrations.
    // The `--force` flag skips the confirmation prompt, crucial for CI environments.
    console.log('Resetting test database and applying migrations...');
    execSync(`${prismaBinary} migrate reset --force --skip-generate`, {
      env: { ...process.env }, // Pass current environment variables
      stdio: 'inherit', // Show output from the command
    });
    console.log('Test database reset and migrations applied successfully.');

    // Optional: Seed database if you have baseline data needed for all tests
    // console.log('Seeding test database...');
    // execSync(`${prismaBinary} db seed`, {
    //   env: { ...process.env },
    //   stdio: 'inherit',
    // });
    // console.log('Test database seeded.');

  } catch (error) {
    console.error('Failed to set up test database:', error.message);
    console.error('Stderr:', error.stderr ? error.stderr.toString() : 'N/A');
    console.error('Stdout:', error.stdout ? error.stdout.toString() : 'N/A');
    // process.exit(1); // Exit if DB setup fails, as tests will likely fail anyway
    throw error; // Re-throw to make Jest aware of the failure
  }

  console.log('Test environment setup complete.');
};

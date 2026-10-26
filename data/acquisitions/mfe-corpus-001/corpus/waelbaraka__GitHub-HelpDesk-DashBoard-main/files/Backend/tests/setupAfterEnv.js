// Backend/tests/setupAfterEnv.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Uses DATABASE_URL from environment (set in globalSetup)

// This function will run before each test file or describe block if configured in Jest
// or you can adapt it to run before/after each test case.
// For now, let's assume it runs to clean before each test suite (file).

beforeAll(async () => {
  // This is a good place if you need to connect to Prisma once per test file
  // await prisma.$connect(); // Prisma client connects lazily, so this isn't strictly necessary
});

afterEach(async () => {
  // Clean up data after each test to ensure test isolation
  // Order of deletion matters due to foreign key constraints.
  // Start with models that are "children" or have foreign keys pointing to others.

  // Prisma does not have a direct "TRUNCATE CASCADE" for all tables easily.
  // The most robust way is to delete in reverse order of creation or by dependency.
  // For the `registerOwner` endpoint, the main entities created are:
  // UserTeamMembership, _RoleToUser (implicit), User, Role, Team, Organization

  // Deleting related records first:
  await prisma.userTeamMembership.deleteMany({});
  // For implicit many-to-many (_RoleToUser), Prisma handles this when related User or Role is deleted,
  // if cascading deletes are set up correctly in the schema.
  // If not, you might need a raw query: await prisma.$executeRawUnsafe('TRUNCATE TABLE "_RoleToUser" RESTART IDENTITY CASCADE;');

  // Then delete the main entities. Order might still matter if there are other relations not covered.
  // If User has a relation to Role (it does), and Role to Organization,
  // we should delete User first, then Role, then Team, then Organization.

  // It's often easier to list all models and delete in an order that respects constraints,
  // or, if your Prisma version and DB support it, find a more global cleanup method.

  // Given the models from schema.prisma involved in registration:
  // Organization, User, Role, Team, UserTeamMembership

  // Order:
  // 1. UserTeamMembership (links User and Team)
  // 2. User (links to Organization, Role) - Roles are M2M
  // 3. Role (links to Organization)
  // 4. Team (links to Organization)
  // 5. Organization
  // Note: Prisma's implicit M2M join table for User-Role (_RoleToUser)
  // records should be cleared when Users or Roles are deleted due to cascading rules.

  // Simpler approach for full cleanup if tests are independent:
  // Delete all from tables that might be affected.
  // The order here tries to respect foreign keys.
  await prisma.userTeamMembership.deleteMany({});
  // await prisma.$executeRawUnsafe('DELETE FROM "_RoleToUser";'); // If explicit cleanup needed for M2M join
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.organization.deleteMany({});

  // Add any other tables that might be populated during tests
  await prisma.loginAttemptLog.deleteMany({});
  await prisma.tag.deleteMany({}); // If tags are created
  await prisma.teamTagAssignment.deleteMany({});
  await prisma.routingRule.deleteMany({});
  await prisma.routingRuleTargetTeam.deleteMany({});

});

afterAll(async () => {
  // Disconnect Prisma client after all tests in a file are done
  await prisma.$disconnect();
});

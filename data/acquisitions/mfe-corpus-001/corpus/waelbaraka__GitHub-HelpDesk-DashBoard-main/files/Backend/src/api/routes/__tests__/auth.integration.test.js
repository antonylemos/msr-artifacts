// Backend/src/api/routes/__tests__/auth.integration.test.js
import request from 'supertest';
import app from '../../../app.js'; // Main Express app
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Used for DB assertions. Uses DATABASE_URL set in jest globalSetup.

describe('POST /api/auth/register-owner - Integration Tests', () => {
  // No beforeEach for data creation here, as globalSetup/AfterEnv handles DB reset and cleanup.
  // Data for each test should be self-contained or created within the test if specific pre-conditions are needed.

  const generateTestUniqueEmail = (prefix = 'testowner_') => `${prefix}${Date.now()}@example.com`;
  const generateTestUniqueOrgName = (prefix = 'TestOrg_') => `${prefix}${Date.now()}`;

  it('should successfully register a new organization and owner with valid data', async () => {
    const uniqueEmail = generateTestUniqueEmail();
    const uniqueOrgName = generateTestUniqueOrgName();
    const registrationData = {
      organizationName: uniqueOrgName,
      firstName: 'Test',
      lastName: 'Owner',
      email: uniqueEmail,
      password: 'Password123!',
    };

    const response = await request(app)
      .post('/api/auth/register-owner')
      .send(registrationData)
      .expect('Content-Type', /json/)
      .expect(201);

    // 1. Verify Response Body
    expect(response.body).toHaveProperty('message', 'Organization and Owner registered successfully!');
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(0);

    // Verify organization in response
    expect(response.body).toHaveProperty('organization');
    expect(response.body.organization.name).toBe(registrationData.organizationName);
    expect(response.body.organization).toHaveProperty('id');
    const organizationId = response.body.organization.id;

    // Verify user in response
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(registrationData.email.toLowerCase());
    expect(response.body.user.firstName).toBe(registrationData.firstName);
    expect(response.body.user.lastName).toBe(registrationData.lastName);
    expect(response.body.user).toHaveProperty('id');
    const userId = response.body.user.id;
    // Ensure sensitive fields are NOT in the response
    expect(response.body.user).not.toHaveProperty('hashedPassword');
    expect(response.body.user).not.toHaveProperty('emailVerificationToken');
    expect(response.body.user).not.toHaveProperty('passwordResetToken');
    expect(response.body.user).not.toHaveProperty('twoFactorSecret');


    // 2. Verify Database State

    // Verify Organization creation
    const dbOrganization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });
    expect(dbOrganization).not.toBeNull();
    expect(dbOrganization.name).toBe(registrationData.organizationName);

    // Verify User creation
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: true }, // Include roles for verification
    });
    expect(dbUser).not.toBeNull();
    expect(dbUser.email).toBe(registrationData.email.toLowerCase());
    expect(dbUser.firstName).toBe(registrationData.firstName);
    expect(dbUser.lastName).toBe(registrationData.lastName);
    expect(dbUser.organizationId).toBe(organizationId);
    expect(dbUser.hashedPassword).not.toBeNull(); // Should be set in DB

    // Verify "Owner" Role creation and assignment
    const ownerRole = await prisma.role.findFirst({
      where: {
        name: 'Owner',
        organizationId: organizationId,
        isSystemRole: true,
      },
    });
    expect(ownerRole).not.toBeNull();
    expect(dbUser.roles.some(role => role.id === ownerRole.id)).toBe(true);
    // Check permissions on the role (optional, but good)
    expect(ownerRole.permissions).toEqual({ "system_all": true });


    // Verify "General" Team creation and user membership
    const generalTeam = await prisma.team.findFirst({
      where: {
        name: 'General',
        organizationId: organizationId,
        isGeneralTeam: true,
      },
    });
    expect(generalTeam).not.toBeNull();

    const userTeamMembership = await prisma.userTeamMembership.findUnique({
      where: {
        userId_teamId: {
          userId: userId,
          teamId: generalTeam.id,
        },
      },
    });
    expect(userTeamMembership).not.toBeNull();

    // Verify that the user's job title is 'Owner'
    expect(dbUser.jobTitle).toBe('Owner');
  });

  // More tests for this endpoint (validation, conflicts) will be added in subsequent steps.
});

// Append these inside the describe('POST /api/auth/register-owner - Integration Tests', () => { ... });

  describe('Validation Error Tests', () => {
    // const uniqueEmail = () => `validation_user_${Date.now()}@example.com`; // Removed
    // const uniqueOrgName = () => `ValidationOrg_${Date.now()}`; // Removed

    const baseValidData = {
      organizationName: generateTestUniqueOrgName('ValidationOrg_'),
      firstName: 'ValidFirst',
      lastName: 'ValidLast',
      email: generateTestUniqueEmail('validation_user_'),
      password: 'ValidPassword123!',
    };

    // Test cases for each missing field
    const requiredFields = [
      'organizationName',
      'firstName',
      'lastName',
      'email',
      'password',
    ];

    requiredFields.forEach((field) => {
      it(`should return 400 if ${field} is missing`, async () => {
        const invalidData = { ...baseValidData };
        delete invalidData[field]; // Remove the field to test for its absence

        const response = await request(app)
          .post('/api/auth/register-owner')
          .send(invalidData)
          .expect('Content-Type', /json/)
          .expect(400);

        expect(response.body).toHaveProperty('message', 'All fields are required for registration.');

        // Verify no organization or user was created
        const dbOrganization = await prisma.organization.findFirst({
          where: { name: baseValidData.organizationName }, // Use original name in case it was the one deleted
        });
        expect(dbOrganization).toBeNull();

        const dbUser = await prisma.user.findFirst({
          where: { email: baseValidData.email }, // Use original email
        });
        expect(dbUser).toBeNull();
      });
    });

    it('should return 400 if password is too short (less than 8 characters)', async () => {
      const shortPasswordData = {
        ...baseValidData,
        email: generateTestUniqueEmail('validation_shortpass_'), // ensure unique email for this attempt
        organizationName: generateTestUniqueOrgName('ValidationOrgShortPass_'), // ensure unique org name
        password: 'short',
      };

      const response = await request(app)
        .post('/api/auth/register-owner')
        .send(shortPasswordData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Password must be at least 8 characters long.');

      // Verify no organization or user was created
      const dbOrganization = await prisma.organization.findFirst({
        where: { name: shortPasswordData.organizationName },
      });
      expect(dbOrganization).toBeNull();
      const dbUser = await prisma.user.findFirst({
        where: { email: shortPasswordData.email },
      });
      expect(dbUser).toBeNull();
    });

    // Example for an invalid email format - controller doesn't have specific check,
    // but good to document if other layers (like express-validator if added) would catch it.
    // For now, the primary "missing fields" and "password length" are what the controller checks.
    // If the email is simply missing, the "missing fields" test covers it.
    // If it's present but malformed, current controller logic would pass it to Prisma,
    // which might then throw an error if the email type is validated strictly at DB level or by Prisma model validation.
    // However, the controller's `existingUser` check `prisma.user.findUnique({ where: { email: email.toLowerCase() }})`
    // would proceed. Let's stick to testing explicit validations in the controller.
  });

// Append these inside the describe('POST /api/auth/register-owner - Integration Tests', () => { ... });

  describe('Conflict Error Tests', () => {
    // const generateUniqueEmail = () => `conflict_user_${Date.now()}@example.com`; // Removed
    // const generateUniqueOrgName = () => `ConflictOrg_${Date.now()}`; // Removed

    it('should return 409 if email already exists', async () => {
      const initialEmail = generateTestUniqueEmail('conflict_user_');
      const initialOrgName = generateTestUniqueOrgName('ConflictOrg_');
      const firstRegistrationData = {
        organizationName: initialOrgName,
        firstName: 'First',
        lastName: 'User',
        email: initialEmail,
        password: 'Password123!',
      };

      // 1. Register the first user and organization successfully
      const firstResponse = await request(app)
        .post('/api/auth/register-owner')
        .send(firstRegistrationData)
        .expect(201);

      expect(firstResponse.body.user.email).toBe(initialEmail.toLowerCase());

      // Count users and orgs before the conflicting attempt
      const orgCountBeforeConflict = await prisma.organization.count();
      const userCountBeforeConflict = await prisma.user.count();

      // 2. Attempt to register another organization with the SAME email
      const conflictingRegistrationData = {
        organizationName: generateTestUniqueOrgName('ConflictOrgOther_'), // Different organization name
        firstName: 'Second',
        lastName: 'User',
        email: initialEmail, // Same email
        password: 'Password456!',
      };

      const conflictResponse = await request(app)
        .post('/api/auth/register-owner')
        .send(conflictingRegistrationData)
        .expect('Content-Type', /json/)
        .expect(409);

      expect(conflictResponse.body).toHaveProperty('message', 'Email already registered.');

      // 3. Verify no new organization or user was created during the conflicting attempt
      const orgCountAfterConflict = await prisma.organization.count();
      const userCountAfterConflict = await prisma.user.count();

      expect(orgCountAfterConflict).toBe(orgCountBeforeConflict);
      expect(userCountAfterConflict).toBe(userCountBeforeConflict);
    });

    // Note: Testing the generic P2002 error (e.g. for org name conflict if it were globally unique)
    // is harder in a pure integration test without specific schema support for that unique constraint
    // or by mocking the service layer. The existing unit tests for `auth.controller.js`
    // cover the controller's reaction to a P2002 error thrown by the service.
    // If Organization.name had a global @unique constraint, a test similar to the email conflict
    // could be written here.
  });

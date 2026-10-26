// src/api/controllers/__tests__/auth.controller.test.js

import { jest } from '@jest/globals';
import { registerOwner } from '../auth.controller.js';  // Adjust path if needed
import authService from '../../services/auth.service.js';

jest.mock('../../utils/prismaClient.js', () => ({
  user: {
    findUnique: jest.fn(),
  },
}));
import prisma from '../../utils/prismaClient.js';
describe('Auth Controller - registerOwner', () => {
  let prismaMock;
  let req;
  let res;
  let next;

  beforeEach(() => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
      },
    };
    PrismaClient.mockImplementation(() => prismaMock);

    req = {
      body: {
        organizationName: 'TestsOrg',
        firstName: 'Jsohn',
        lastName: 'Dsoe',
        email: 'johns@example.com',
        password: 'passsword123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if required fields are missing', async () => {
    req.body = {}; // Empty body
    await registerOwner(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required for registration." });
  });

  it('returns 400 if password is too short', async () => {
    req.body.password = 'short';
    await registerOwner(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Password must be at least 8 characters long." });
  });

  it('returns 409 if email is already registered', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: 1, email: 'john@example.com' }); // simulate user exists
    await registerOwner(req, res, next);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "Email already registered." });
  });

  it('successfully registers new owner and organization', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null); // no existing user
    const fakeResult = {
      user: {
        id: 1,
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: 'hashed',
        emailVerificationToken: 'token',
        passwordResetToken: 'resetToken',
        passwordResetExpires: new Date(),
        twoFactorSecret: 'secret',
      },
      organization: { id: 10, name: 'TestOrg' },
    };

    authService.registerOwnerAndOrganization.mockResolvedValue(fakeResult);
    authService.generateToken.mockReturnValue('fake-jwt-token');

    await registerOwner(req, res, next);

    expect(authService.registerOwnerAndOrganization).toHaveBeenCalledWith({
      organizationName: 'TestOrg',
      ownerFirstName: 'John',
      ownerLastName: 'Doe',
      ownerEmail: 'john@example.com',
      ownerPassword: 'password123',
    });

    expect(authService.generateToken).toHaveBeenCalledWith(fakeResult.user);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Organization and Owner registered successfully!",
      user: {
        id: 1,
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      },
      organization: { id: 10, name: 'TestOrg' },
      token: 'fake-jwt-token',
    });
  });

  it('calls next with error on unexpected exception', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error('DB failure'));
    await registerOwner(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('handles Prisma P2002 unique constraint error', async () => {
    const error = new Error('Unique constraint');
    error.code = 'P2002';
    authService.registerOwnerAndOrganization.mockRejectedValue(error);

    prismaMock.user.findUnique.mockResolvedValue(null);

    await registerOwner(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Registration conflict. Organization name might already exist or another unique constraint failed."
    });
  });
});
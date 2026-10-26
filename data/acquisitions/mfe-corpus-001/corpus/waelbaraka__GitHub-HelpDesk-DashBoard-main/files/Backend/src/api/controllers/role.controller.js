// src/api/controllers/role.controller.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * @desc    Create a new role
 * @route   POST /api/roles
 * @access  Private (requires 'role_manage' permission)
 */
export const createRole = async (req, res, next) => {
  try {
    const { name, description, permissions } = req.body;
    const organizationId = req.user.organizationId;

    if (!name || !permissions) {
      return res.status(400).json({ message: 'Role name and permissions are required.' });
    }

    // Check for duplicate role name within the same organization
    const existingRole = await prisma.role.findFirst({
        where: { name, organizationId }
    });
    if (existingRole) {
        return res.status(409).json({ message: `A role with the name '${name}' already exists.` });
    }

    const newRole = await prisma.role.create({
      data: {
        name,
        description,
        permissions, // Expecting a JSON object like { "user_read": true, "team_manage": true }
        organizationId,
        isSystemRole: false, // User-created roles are never system roles
      },
    });

    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all roles for the user's organization
 * @route   GET /api/roles
 * @access  Private (requires 'role_manage' permission)
 */
export const listRoles = async (req, res, next) => {
  try {
    const roles = await prisma.role.findMany({
      where: {
        organizationId: req.user.organizationId,
      },
      orderBy: {
        name: 'asc',
      },
    });
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single role by ID
 * @route   GET /api/roles/:id
 * @access  Private (requires 'role_manage' permission)
 */
export const getRoleById = async (req, res, next) => {
  try {
    const roleId = parseInt(req.params.id);
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
        organizationId: req.user.organizationId, // Ensure it's within the user's org
      },
    });

    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a role's details
 * @route   PATCH /api/roles/:id
 * @access  Private (requires 'role_manage' permission)
 */
export const updateRole = async (req, res, next) => {
  try {
    const roleId = parseInt(req.params.id);
    const { name, description, permissions } = req.body;

    // First, find the role to ensure it exists and isn't a system role
    const existingRole = await prisma.role.findFirst({
      where: {
        id: roleId,
        organizationId: req.user.organizationId,
      },
    });

    if (!existingRole) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    // IMPORTANT: Protect system roles from being modified by users
    if (existingRole.isSystemRole) {
      return res.status(403).json({ message: 'System roles cannot be modified.' });
    }

    const updatedRole = await prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        name,
        description,
        permissions,
      },
    });

    res.status(200).json(updatedRole);
  } catch (error) {
    // Handle potential unique constraint violation if they change the name to one that already exists
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'A role with this name already exists.' });
    }
    next(error);
  }
};

/**
 * @desc    Delete a role
 * @route   DELETE /api/roles/:id
 * @access  Private (requires 'role_manage' permission)
 */
export const deleteRole = async (req, res, next) => {
  try {
    const roleId = parseInt(req.params.id);

    // Find the role to verify it exists, belongs to the org, and is not a system role
    const role = await prisma.role.findFirst({
      where: {
        id: roleId,
        organizationId: req.user.organizationId,
      },
      include: {
        _count: {
          select: { users: true } // Check if any users are assigned to this role
        }
      }
    });

    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    if (role.isSystemRole) {
      return res.status(403).json({ message: 'Cannot delete a system role.' });
    }

    if (role._count.users > 0) {
      return res.status(400).json({ message: `Cannot delete role. It is currently assigned to ${role._count.users} user(s).` });
    }

    // If all checks pass, delete the role
    await prisma.role.delete({
      where: {
        id: roleId,
      },
    });

    res.status(204).send(); // 204 No Content is standard for a successful deletion
  } catch (error) {
    next(error);
  }
};
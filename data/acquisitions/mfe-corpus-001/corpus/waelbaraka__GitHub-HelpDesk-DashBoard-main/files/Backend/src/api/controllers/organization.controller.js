// src/api/controllers/organization.controller.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * @desc    Get the profile of the currently logged-in user's organization
 * @route   GET /api/organization
 * @access  Private (requires 'organization_read' permission)
 */
export const getCurrentOrganization = async (req, res, next) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        id: req.user.organizationId,
      },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found." });
    }

    res.status(200).json(organization);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update the profile of the currently logged-in user's organization
 * @route   PATCH /api/organization
 * @access  Private (requires 'organization_update' permission)
 */
export const updateCurrentOrganization = async (req, res, next) => {
  try {
    // You can add many more fields here from your Organization model
    const { name, addressLine1, city, stateProvince, zipPostalCode, mainPhoneNumber } = req.body;

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: req.user.organizationId,
      },
      data: {
        name,
        addressLine1,
        city,
        stateProvince,
        zipPostalCode,
        mainPhoneNumber,
      },
    });

    res.status(200).json(updatedOrganization);
  } catch (error) {
    next(error);
  }
};
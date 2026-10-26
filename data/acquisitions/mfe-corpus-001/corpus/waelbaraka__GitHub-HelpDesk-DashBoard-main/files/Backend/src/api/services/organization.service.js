import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';

// async function createOrganizationAndFirstAdmin(data) {
//   // Use a transaction to ensure all related records are created together.
//   const result = await prisma.$transaction(async (tx) => {
    
//     // STEP 1: Create the Organization
//     // The foundation for everything else.
//     const newOrganization = await tx.organization.create({
//       data: {
//         name: data.organizationName,
//         // Set any other default organization properties here
//       },
//     });

//     // STEP 2: Create the "Organization Admin" Role
//     // This role will have full permissions and is created for this specific organization.
//     const adminRole = await tx.role.create({
//       data: {
//         name: "Organization Admin",
//         description: "Full administrative access to the organization.",
//         permissions: { "system": ["*"] }, // A placeholder for "all permissions"
//         isSystemRole: true,
//         organizationId: newOrganization.id,
//       },
//     });

//     // STEP 3: CREATE THE "GENERAL TEAM"
//     // This is the key step. It happens immediately after the organization is created.
//     const generalTeam = await tx.team.create({
//       data: {
//         name: "General",
//         description: `All users in the ${newOrganization.name} organization.`,
//         isGeneralTeam: true, // The critical flag is set here.
//         organizationId: newOrganization.id,
//       },
//     });

//     // STEP 4: Create the first User (the Owner/Admin)
//     const hashedPassword = await bcrypt.hash(data.ownerPassword, 12);
//     const ownerUser = await tx.user.create({
//       data: {
//         firstName: data.ownerFirstName,
//         lastName: data.ownerLastName,
//         fullName: `${data.ownerFirstName} ${data.ownerLastName}`,
//         email: data.ownerEmail,
//         hashedPassword: hashedPassword,
//         isEmailVerified: true, // The person signing up has a verified email by definition.
//         organizationId: newOrganization.id,
//       },
//     });

//     // STEP 5: Assign the "Organization Admin" Role to the Owner
//     // We connect the user and the role we just created.
//     await tx.user.update({
//       where: { id: ownerUser.id },
//       data: {
//         roles: {
//           connect: { id: adminRole.id },
//         },
//       },
//     });

//     // STEP 6: AUTOMATICALLY add the Owner to the "General Team"
//     // We create the membership link in the join table.
//     await tx.userTeamMembership.create({
//       data: {
//         userId: ownerUser.id,
//         teamId: generalTeam.id,
//       },
//     });

//     // The transaction will commit all these changes now.
//     // We can return the user and org info.
//     return { user: ownerUser, organization: newOrganization };
//   });

//   // The 'result' object contains the newly created user and organization.
//   // The service can now return this, and the controller can generate JWTs, etc.
//   return result;
// }
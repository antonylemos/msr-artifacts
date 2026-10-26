// src/api/services/module.service.js
import sql from '../../db/sqlClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Lists all available modules in the platform.
 * This is used for the "Explore Apps" / Marketplace page.
 */
export const listAvailableModules = async ({ searchTerm = '', category = null, paymentType = null, placement = null, sortBy = 'name', sortOrder = 'asc', page = 1, limit = 20 } = {}) => {
  // In a real application, the Module table would have columns for category, paymentType, placement, rating, publishDate etc.
  // For now, we'll assume it just has id, name, description, version, author.
  // The filtering and sorting here would become more complex as you add those fields to the "Module" table.

  const offset = (page - 1) * limit;
  let whereClauses = [];
  
  if (searchTerm) {
    const searchPattern = `%${searchTerm.toLowerCase()}%`;
    // Adjust search fields based on your Module table structure
    whereClauses.push(sql`(LOWER(name) LIKE ${searchPattern} OR LOWER(description) LIKE ${searchPattern} OR LOWER(author) LIKE ${searchPattern})`);
  }

  // Placeholder for future filters - these would require corresponding columns on "Module" table
  // if (category && category !== 'all') {
  //   whereClauses.push(sql`category = ${category}`);
  // }
  // if (paymentType && paymentType !== 'all') {
  //   whereClauses.push(sql`"paymentType"::text ILIKE ${'%' + paymentType + '%'}`); // Example if paymentType is an array or JSON
  // }
  // if (placement && placement !== 'all') {
  //    whereClauses.push(sql`"placementAreas"::text ILIKE ${'%' + placement + '%'}`); // Example if placementAreas is an array
  // }


  const whereSql = whereClauses.length > 0 ? sql`WHERE ${sql.join(whereClauses, sql` AND `)}` : sql``;

  // Adjust sortBy columns based on your Module table
  const validSortColumns = {
    name: sql`name`,
    // popularity: sql`"installCount"`, // Example, if you track installs
    // rating: sql`"averageRating"`,    // Example
    // recently_published: sql`"publishedAt"`, // Example
  };
  const orderByColumn = validSortColumns[sortBy] || validSortColumns.name;
  const orderByDirection = sortOrder.toLowerCase() === 'asc' ? sql`ASC` : sql`DESC NULLS LAST`;

  const modules = await sql`
    SELECT 
      id, 
      name, 
      description, 
      version, 
      author,
      "uiComponents" -- Crucial for frontend to know where to render things
      -- Add other fields like logoUrl, averageRating, installCount, categoryTags, paymentInfo, placementInfo
      -- FROM "Module" table that your marketplace UI needs.
    FROM "Module"
    ${whereSql}
    ORDER BY ${orderByColumn} ${orderByDirection}
    LIMIT ${limit} OFFSET ${offset};
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*) FROM "Module"
    ${whereSql};
  `;
  
  // The frontend 'AppCard' expects more fields than just what's in the basic Module table.
  // You'll need to either:
  // 1. Add these fields to your "Module" table schema (e.g., logoUrl, rating, reviewCount, paymentType as an array, isAiPowered).
  // 2. Or, for now, augment the data here if some of it is static or derived.
  // For this example, let's assume the Module table will eventually have these fields.
  const augmentedModules = modules.map(mod => ({
      ...mod,
      // Provide dummy defaults if these fields are not yet in your DB "Module" table
      logo: mod.logoUrl || '⚙️', // Default icon if no logoUrl
      category: mod.category || 'General', // Needs a category field in DB
      paymentType: mod.paymentType || ['free'], // Needs a paymentType field in DB (e.g., text[])
      placement: mod.placement || ['Settings'], // Needs a placement field in DB (e.g., text[])
      rating: mod.averageRating || 4.0 + Math.random(), // Dummy rating
      reviewCount: mod.reviewCount || Math.floor(Math.random() * 100), // Dummy review count
      isAiPowered: mod.tags?.includes('ai') || false, // Example if tags field exists
      worksWith: 'Your Platform Name', // This could be static or from config
      getButtonText: 'View Details', // For the marketplace list
      // The uiComponents field from DB is already included
  }));


  return {
    modules: augmentedModules,
    totalModules: parseInt(count, 10),
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

/**
 * Gets details for a single available module.
 * Used by the AppDetailsPage.
 */
 export const getModuleDetailsById = async (moduleId) => {
  if (!moduleId) {
    // This check is good, but the controller should also validate
    throw new ApiError(400, "Module ID is required to fetch details.");
  }
  console.log(`SERVICE: Querying Module table for id: ${moduleId}`); // Add log

  const [moduleDetails] = await sql`
    SELECT 
      id, 
      name, 
      description, 
      version, 
      author,
      "requiredPermissions",
      "uiComponents",
      -- Add ALL other columns from your "Module" table that AppDetailsPage needs
      "logoUrl", 
      "shortDescription", 
      "isVerified",
      "averageRating", 
      "reviewCount",
      "developerLink",
      "worksWithText" AS "worksWith", -- Use AS if DB column name is different
      "getButtonText",
      "getButtonLink",
      "overviewContent", -- Assuming this is a JSONB field in your DB
      "keyFeatures",     -- Assuming JSONB[]
      "benefits",        -- Assuming JSONB[]
      "appTerms",        -- Assuming JSONB
      "supportInfo",     -- Assuming JSONB
      "category",        -- Assuming TEXT
      "paymentTypes",    -- Assuming TEXT[]
      "placementAreas"   -- Assuming TEXT[]
    FROM "Module" -- Ensure table name is correct ("Module")
    WHERE id = ${moduleId};
  `;

  if (!moduleDetails) {
    console.log(`SERVICE: Module with id "${moduleId}" NOT FOUND in database.`); // Add log
    return null; // Controller will handle the 404
  }

  console.log(`SERVICE: Module "${moduleId}" FOUND:`, moduleDetails); // Add log

  
  // Similar to listAvailableModules, augment with dummy data if fields are missing from DB,
  // or ensure your "Module" table is comprehensive.
  // For AppDetailsPage, the 'appDetailsData' structure is quite rich.
  // Your "Module" table needs to store this (e.g., mainDescription, keyFeatures as JSONB).
  const augmentedDetails = {
      ...moduleDetails,
      // Dummy data mirroring the structure AppDetailsPage expects
      logoUrl: moduleDetails.logoUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png',
      shortDescription: moduleDetails.shortDescription || moduleDetails.description?.substring(0,100) + '...',
      isVerified: moduleDetails.isVerified !== undefined ? moduleDetails.isVerified : true,
      rating: moduleDetails.averageRating || 4.5,
      reviewCount: moduleDetails.reviewCount || 50,
      developer: moduleDetails.author || 'Platform Vendor',
      developerLink: moduleDetails.developerLink || '#',
      worksWith: 'Your Platform Name',
      getButtonText: 'Get',
      getButtonLink: '#', // This would be dynamic based on installation status
      overview: moduleDetails.overviewContent || { // Assume overviewContent is a JSONB field
          media: [{ type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://via.placeholder.com/800x450?text=Video' }],
          scrollIndicatorText: ["Module Overview Video"],
          mainDescription: moduleDetails.detailedDescription || moduleDetails.description || "No detailed overview available."
      },
      keyFeatures: moduleDetails.keyFeatures || [{title: "Core Feature 1", description: "Does something amazing."}],
      benefits: moduleDetails.benefits || [{title: "Main Benefit", description: "Helps you achieve goals."}],
      appTerms: moduleDetails.appTerms || { legalText: "Standard terms apply.", scopes: [{title: "View Data", details: "Access to basic data."}]},
      reviews: moduleDetails.reviewsData || { averageRating: 4.5, totalReviews: 50, userReviews: [] },
      support: moduleDetails.supportInfo || { howToUse: "Refer to documentation.", appTutorialLink: "#", contactIntegrationsLink: "#", footerNote: "Provided as-is."},
      // uiComponents would come directly from moduleDetails.uiComponents
  };

  return augmentedDetails;
};








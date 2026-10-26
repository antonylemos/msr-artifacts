/* eslint-disable camelcase */
export const shorthands = undefined;

export function up(pgm) {
  // === MODULE (Defines available apps/plugins in your marketplace) ===

    pgm.dropTable('Module', { ifExists: true });

  pgm.createTable('Module', {
    id: { type: 'varchar(100)', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'text' },
    shortDescription: { type: 'varchar(500)' }, // Added
    version: { type: 'varchar(50)', notNull: true },
    author: { type: 'varchar(255)' },
    developerLink: { type: 'text' },
    logoUrl: { type: 'text' }, // Added
    category: { type: 'text' }, // Added
    tags: { type: 'text[]', default: '{}' }, // Added
    paymentTypes: { type: 'text[]', default: '{}' }, // Added
    pricingDetails: { type: 'text' },
    placementAreas: { type: 'text[]', default: '{}' }, // Added
    averageRating: { type: 'numeric(2,1)' }, // Added
    reviewCount: { type: 'integer', default: 0 }, // Added
    installCount: { type: 'integer', default: 0 },
    isVerified: { type: 'boolean', default: false },
    requiredPermissions: { type: 'text[]', default: '{}' },
    uiComponents: { type: 'jsonb', default: '{}' }, // Added
    overviewContent: { type: 'jsonb' }, // Added
    keyFeatures: { type: 'jsonb[]' },   // Added (array of jsonb)
    benefits: { type: 'jsonb[]' },      // Added (array of jsonb)
    appTerms: { type: 'jsonb' },        // Added
    supportInfo: { type: 'jsonb' },     // Added
    publishedAt: { type: 'timestamptz', default: pgm.func('current_timestamp') },
    lastUpdatedAt: { type: 'timestamptz', default: pgm.func('current_timestamp') },
    worksWithText: {type: 'text', default: 'Your Platform Name'}, // Added
    getButtonText: { type: 'varchar(50)' }, // Added
    getButtonLink: { type: 'text' }         // Added
  });

  pgm.createIndex('Module', 'category');
  pgm.createIndex('Module', 'tags', { method: 'gin' });
  pgm.createIndex('Module', 'paymentTypes', { method: 'gin' });
  pgm.createIndex('Module', 'placementAreas', { method: 'gin' });
  pgm.createIndex('Module', 'publishedAt');
  pgm.createIndex('Module', 'installCount');
  pgm.createIndex('Module', 'averageRating');

  // === ORGANIZATION MODULE INSTALLATION (Join Table) ===

   pgm.createTable('OrganizationModuleInstallation', {
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    moduleId: { type: 'varchar(100)', notNull: true, references: '"Module"(id) ON DELETE CASCADE' },
    installedAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
    isEnabled: { type: 'boolean', notNull: true, default: true },
    settings: { type: 'jsonb' }
    // REMOVE: primaryKey: ['organizationId', 'moduleId']
  });

  // Add primary key constraint
  pgm.addConstraint('OrganizationModuleInstallation', 'org_module_pk', {
    primaryKey: ['organizationId', 'moduleId']
  });

  pgm.createIndex('OrganizationModuleInstallation', 'organizationId');
  pgm.createIndex('OrganizationModuleInstallation', 'moduleId');



  pgm.sql(`
    CREATE OR REPLACE FUNCTION trigger_set_module_updatedat()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW."lastUpdatedAt" = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER set_timestamp_on_module_update
    BEFORE UPDATE ON "Module"
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_module_updatedat(); 
  `);
};

export const down = (pgm) => {
  pgm.dropTable('OrganizationModuleInstallation', { ifExists: true, cascade: true });
  pgm.sql(`DROP TRIGGER IF EXISTS set_timestamp_on_module_update ON "Module";`);
  pgm.sql(`DROP FUNCTION IF EXISTS trigger_set_module_updatedat();`);
  pgm.dropTable('Module', { ifExists: true, cascade: true });
};



/* eslint-disable camelcase */

// This is the migration file for creating the initial database schema.
// It is designed to be run with `node-pg-migrate`.

export const shorthands = undefined;

export function up(pgm) {
  // -- EXTENSIONS --
  // For case-insensitive text, useful for emails and some identifiers.
  pgm.createExtension('citext', { ifNotExists: true });

  // === ORGANIZATION ===
  pgm.createTable('Organization', {
    id: 'id', // This creates a `SERIAL PRIMARY KEY` by default
    name: { type: 'text', notNull: true, unique: true },
    logoUrl: { type: 'text' },
    websiteUrl: { type: 'text' },
    tagline: { type: 'text' },
    mainPhoneNumber: { type: 'text' },
    supportEmail: { type: 'text' },
    addressLine1: { type: 'text' },
    addressLine2: { type: 'text' },
    city: { type: 'text' },
    stateProvince: { type: 'text' },
    zipPostalCode: { type: 'text' },
    country: { type: 'text' },
    twitterUrl: { type: 'text' },
    facebookUrl: { type: 'text' },
    instagramUrl: { type: 'text' },
    storeWebsiteUrl: { type: 'text' },
    timezone: { type: 'text', notNull: true, default: 'Etc/UTC' },
    currency: { type: 'text', notNull: true, default: 'USD' },
    defaultLanguage: { type: 'text', notNull: true, default: 'en' },
    weekStartsOn: { type: 'text', notNull: true, default: 'sunday' },
    chatAssignmentMode: { type: 'text', notNull: true, default: 'auto' },
    defaultOperatingHours: { type: 'jsonb' },
    industry: { type: 'text' },
    organizationType: { type: 'text' },
    subscriptionPlanId: { type: 'text' },
    subscriptionStatus: { type: 'text' },
    billingContactEmail: { type: 'text' },
    paymentProcessorId: { type: 'text' },
    trialEndsAt: { type: 'timestamp(3)' },
    createdAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') } // We'll add a trigger for this later
  });

  // === ROLE ===
  pgm.createTable('Role', {
    id: 'id',
    name: { type: 'text', notNull: true },
    description: { type: 'text' },
    permissions: { type: 'jsonb', notNull: true, default: '{}' },
    isSystemRole: { type: 'boolean', notNull: true, default: false },
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    createdAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') }
  });
  pgm.addConstraint('Role', 'Role_organizationId_name_key', { unique: ['organizationId', 'name'] });
  pgm.createIndex('Role', 'organizationId');

  // === USER ===
  pgm.createTable('User', {
    id: 'id',
    agentIdHumanReadable: { type: 'text', unique: true },
    firstName: { type: 'text', notNull: true },
    lastName: { type: 'text', notNull: true },
    fullName: { type: 'text', notNull: true },
    email: { type: 'citext', notNull: true, unique: true }, // Use citext for emails
    agentStatusAfterLogin: { type: 'varchar(50)', default: 'accept_chats' },
    hashedPassword: { type: 'text' },
    profilePictureUrl: { type: 'text' },
    phoneNumber: { type: 'text' },
    jobTitle: { type: 'text' },
    isActiveAccount: { type: 'boolean', notNull: true, default: true },
    isBanned: { type: 'boolean', notNull: true, default: false },
    deactivationDetails: { type: 'jsonb' },
    isEmailVerified: { type: 'boolean', notNull: true, default: false },
    emailVerificationToken: { type: 'text', unique: true },
    passwordResetToken: { type: 'text', unique: true },
    passwordResetExpires: { type: 'timestamp(3)' },
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    permissionOverrides: { type: 'jsonb' },
    invitationToken: { type: 'text', unique: true },
    invitationExpires: { type: 'timestamp(3)' },
    invitedByUserId: { type: 'integer' }, // Foreign key will be added later if needed
    timezone: { type: 'text' },
    skills: { type: 'text[]' },
    currentStatus: { type: 'text' },
    lastStatusChangeAtUtc: { type: 'timestamp(3)' },
    statusReason: { type: 'text' },
    maxConcurrentChats: { type: 'integer', default: 3 },
    currentActiveChatsCount: { type: 'integer', default: 0 },
    dailyAssignedTicketsCount: { type: 'integer', default: 0 },
    weeklyAssignedTicketsCount: { type: 'integer', default: 0 },
    workingHours: { type: 'jsonb' },
    availabilityOverrides: { type: 'jsonb' },
    preferredSystemLanguage: { type: 'text' },
    preferredNotificationChannels: { type: 'text[]', default: '{email}' },
    onboardingCompleted: { type: 'boolean', notNull: true, default: false },
    lastTrainingSessionAt: { type: 'timestamp(3)' },
    certifications: { type: 'jsonb' },
    currentWorkLocationType: { type: 'text' },
    currentWorkLocationDetails: { type: 'jsonb' },
    customFields: { type: 'jsonb' },
    createdByUserId: { type: 'integer' },
    lastUpdatedByUserId: { type: 'integer' },
    lastPasswordChangeAt: { type: 'timestamp(3)' },
    twoFactorSecret: { type: 'text' },
    isTwoFactorEnabled: { type: 'boolean', notNull: true, default: false },
    joinedDate: { type: 'timestamp(3)', default: pgm.func('current_timestamp') },
    createdAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    lastLoginAt: { type: 'timestamp(3)' },
    performanceMetricsSummary: { type: 'jsonb' }
  });
  pgm.createIndex('User', 'organizationId');
  pgm.createIndex('User', 'currentStatus');
  pgm.createIndex('User', 'skills', { method: 'gin' });
  pgm.createIndex('User', 'jobTitle');

  // === TEAM ===
  pgm.createTable('Team', {
    id: 'id',
    name: { type: 'text', notNull: true },
    description: { type: 'text' },
    isGeneralTeam: { type: 'boolean', notNull: true, default: false },
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    leadUserId: { type: 'integer', references: '"User"(id) ON DELETE SET NULL' },
    totalChatsLastPeriod: { type: 'integer', default: 0 },
    avgChatSatisfaction: { type: 'double precision' },
    goals: { type: 'jsonb' },
    createdAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') }
  });
  pgm.addConstraint('Team', 'Team_organizationId_name_key', { unique: ['organizationId', 'name'] });
  pgm.createIndex('Team', 'organizationId');
  pgm.createIndex('Team', 'leadUserId');

  // === USER <-> TEAM MEMBERSHIP (JOIN TABLE) ===
pgm.createTable('UserTeamMembership', {
  userId: { type: 'integer', notNull: true, references: '"User"(id) ON DELETE CASCADE' },
  teamId: { type: 'integer', notNull: true, references: '"Team"(id) ON DELETE CASCADE' },
  assignedAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
  priorityLevel: { type: 'integer', default: 2 }
}, {
  primaryKey: ['userId', 'teamId']  // <-- primaryKey must be in options, not in columns
});
  pgm.createIndex('UserTeamMembership', ['teamId', 'priorityLevel']);

  // === TAG ===
  pgm.createTable('Tag', {
    id: 'id',
    name: { type: 'text', notNull: true },
    description: { type: 'text' },
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    createdAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') }
  });
  pgm.addConstraint('Tag', 'Tag_organizationId_name_key', { unique: ['organizationId', 'name'] });
  pgm.createIndex('Tag', 'organizationId');

  // === TEAM <-> TAG ASSIGNMENT (JOIN TABLE) ===
pgm.createTable('TeamTagAssignment', {
  tagId: { type: 'integer', notNull: true, references: '"Tag"(id) ON DELETE CASCADE' },
  teamId: { type: 'integer', notNull: true, references: '"Team"(id) ON DELETE CASCADE' },
  assignedByUserId: { type: 'integer', notNull: true, references: '"User"(id) ON DELETE RESTRICT' },
  assignedAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') }
}, {
  primaryKey: ['tagId', 'teamId']  // <-- primaryKey must be in options, not in columns
});
  pgm.createIndex('TeamTagAssignment', 'assignedByUserId');

  // === ROUTING RULE ===
  pgm.createTable('RoutingRule', {
    id: 'id',
    name: { type: 'text', notNull: true },
    description: { type: 'text' },
    isActive: { type: 'boolean', notNull: true, default: true },
    priority: { type: 'integer', notNull: true },
    conditions: { type: 'jsonb', notNull: true },
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    createdAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') }
  });
  pgm.createIndex('RoutingRule', ['organizationId', 'isActive', 'priority']);

  // === ROUTING RULE <-> TEAM (JOIN TABLE) ===
pgm.createTable('RoutingRuleTargetTeam', {
  routingRuleId: { type: 'integer', notNull: true, references: '"RoutingRule"(id) ON DELETE CASCADE' },
  teamId: { type: 'integer', notNull: true, references: '"Team"(id) ON DELETE CASCADE' }
}, {
  primaryKey: ['routingRuleId', 'teamId']  // <-- primaryKey must be in options, not in columns
});

  // === LOGIN ATTEMPT LOG ===
  pgm.createTable('LoginAttemptLog', {
    id: 'id',
    timestamp: { type: 'timestamp(3)', notNull: true, default: pgm.func('current_timestamp') },
    userId: { type: 'integer', references: '"User"(id) ON DELETE SET NULL' },
    attemptedEmail: { type: 'text', notNull: true },
    eventType: { type: 'text', notNull: true },
    ipAddress: { type: 'text' },
    userAgent: { type: 'text' },
    failureReason: { type: 'text' },
    twoFactorAttempted: { type: 'boolean', notNull: true, default: false },
    twoFactorPassed: { type: 'boolean' },
    organizationId: { type: 'integer', references: '"Organization"(id) ON DELETE SET NULL' }
  });
  pgm.createIndex('LoginAttemptLog', 'timestamp');
  pgm.createIndex('LoginAttemptLog', 'userId');
  pgm.createIndex('LoginAttemptLog', 'attemptedEmail');
  pgm.createIndex('LoginAttemptLog', 'eventType');
  pgm.createIndex('LoginAttemptLog', 'ipAddress');
  pgm.createIndex('LoginAttemptLog', 'organizationId');

  // === USER <-> ROLE (JOIN TABLE, Prisma's implicit style) ===
  pgm.createTable('_UserRoles', {
    A: { type: 'integer', notNull: true, references: '"Role"(id) ON DELETE CASCADE' },
    B: { type: 'integer', notNull: true, references: '"User"(id) ON DELETE CASCADE' }
  });
  pgm.addConstraint('_UserRoles', '_UserRoles_AB_unique', { unique: ['A', 'B'] });
  pgm.createIndex('_UserRoles', 'B');
};

export function down(pgm) {
  // Drop tables in reverse order of creation to respect foreign key constraints
  pgm.dropTable('_UserRoles', { ifExists: true, cascade: true });
  pgm.dropTable('LoginAttemptLog', { ifExists: true, cascade: true });
  pgm.dropTable('RoutingRuleTargetTeam', { ifExists: true, cascade: true });
  pgm.dropTable('RoutingRule', { ifExists: true, cascade: true });
  pgm.dropTable('TeamTagAssignment', { ifExists: true, cascade: true });
  pgm.dropTable('Tag', { ifExists: true, cascade: true });
  pgm.dropTable('UserTeamMembership', { ifExists: true, cascade: true });
  pgm.dropTable('Team', { ifExists: true, cascade: true });
  pgm.dropTable('User', { ifExists: true, cascade: true });
  pgm.dropTable('Role', { ifExists: true, cascade: true });
  pgm.dropTable('Organization', { ifExists: true, cascade: true });
  // Drop custom types and extensions last
  pgm.dropExtension('citext', { ifExists: true });
};
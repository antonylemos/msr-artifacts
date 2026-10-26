Okay, let's add the `LoginAttemptLog` to the schema and then provide comprehensive schema documentation for all the specified models (`Organization`, `User`, `Team`, `Role`, `UserTeamMembership`, `Tag`, `TeamTagAssignment`, `RoutingRule`, and `LoginAttemptLog`), with a specific focus on HIPAA compliance considerations for each.

---

### Prisma Schema with `LoginAttemptLog` and Other Core Models

```prisma
// schema.prisma


// schema.prisma

datasource db {
  provider = "postgresql" // Correct provider
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============== ORGANIZATION =================
model Organization {
  id   Int    @id @default(autoincrement())
  name String

  logoUrl               String?
  websiteUrl            String?
  tagline               String?
  mainPhoneNumber       String?
  supportEmail          String?
  addressLine1          String?
  addressLine2          String?
  city                  String?
  stateProvince         String?
  zipPostalCode         String?
  country               String?
  twitterUrl            String?
  facebookUrl           String?
  instagramUrl          String?
  storeWebsiteUrl       String?
  timezone              String    @default("Etc/UTC")
  currency              String    @default("USD")
  defaultLanguage       String    @default("en")
  weekStartsOn          String    @default("sunday")
  chatAssignmentMode    String    @default("auto")
  defaultOperatingHours Json?
  industry              String?
  organizationType      String?
  subscriptionPlanId    String?
  subscriptionStatus    String?
  billingContactEmail   String?
  paymentProcessorId    String?
  trialEndsAt           DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  users         User[]
  roles         Role[]
  teams         Team[]
  tags          Tag[]
  routingRules  RoutingRule[]
  loginAttempts LoginAttemptLog[]
  // auditLogs         AuditLog[]
}

// ============== ROLE =================
model Role {
  id           Int     @id @default(autoincrement())
  name         String
  description  String?
  permissions  Json
  isSystemRole Boolean @default(false)

  organizationId Int
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  // Implicit M2M with User for PostgreSQL
  // Prisma will create and manage a join table named _RoleToUser
  users User[] @relation("UserRoles")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([organizationId, name])
  @@index([organizationId])
}

// ============== USER (Agent/Staff) =================
model User {
  id                     Int       @id @default(autoincrement())
  agentIdHumanReadable   String?   @unique
  firstName              String
  lastName               String
  fullName               String
  email                  String    @unique
  hashedPassword         String?
  profilePictureUrl      String?
  phoneNumber            String?
  jobTitle               String?
  isActiveAccount        Boolean   @default(true)
  isBanned               Boolean   @default(false)
  deactivationDetails    Json?
  isEmailVerified        Boolean   @default(false)
  emailVerificationToken String?   @unique
  passwordResetToken     String?   @unique
  passwordResetExpires   DateTime?

  organizationId Int
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  // Implicit M2M with Role for PostgreSQL
  roles Role[] @relation("UserRoles")

  permissionOverrides Json?
  invitationToken     String?   @unique
  invitationExpires   DateTime?
  invitedByUserId     Int? // Foreign key to User.id
  // invitedBy         User?     @relation("InvitationsSent", fields: [invitedByUserId], references: [id], onDelete: SetNull, map: "user_invited_by_fk")
  // invitationsSent   User[]    @relation("InvitationsSent")

  timezone                      String?
  skills                        String[] // PostgreSQL supports array types
  currentStatus                 String?
  lastStatusChangeAtUtc         DateTime?
  statusReason                  String?
  maxConcurrentChats            Int?      @default(3)
  currentActiveChatsCount       Int?      @default(0)
  dailyAssignedTicketsCount     Int?      @default(0)
  weeklyAssignedTicketsCount    Int?      @default(0)
  workingHours                  Json? // Maps to JSONB in PostgreSQL
  availabilityOverrides         Json?
  preferredSystemLanguage       String?
  preferredNotificationChannels String[]  @default(["email"])
  onboardingCompleted           Boolean   @default(false)
  lastTrainingSessionAt         DateTime?
  certifications                Json?
  currentWorkLocationType       String?
  currentWorkLocationDetails    Json?
  customFields                  Json?
  createdByUserId               Int? // Foreign key to User.id
  // createdBy         User?     @relation("UserCreations", fields: [createdByUserId], references: [id], onDelete: SetNull, map: "user_created_by_fk")
  // creationsMade     User[]    @relation("UserCreations")
  lastUpdatedByUserId           Int? // Foreign key to User.id
  // lastUpdatedBy     User?     @relation("UserUpdates", fields: [lastUpdatedByUserId], references: [id], onDelete: SetNull, map: "user_updated_by_fk")
  // updatesMade       User[]    @relation("UserUpdates")
  lastPasswordChangeAt          DateTime?
  twoFactorSecret               String? // Store ENCRYPTED
  isTwoFactorEnabled            Boolean   @default(false)
  joinedDate                    DateTime? @default(now())
  createdAt                     DateTime  @default(now())
  updatedAt                     DateTime  @updatedAt
  lastLoginAt                   DateTime?

  teamMemberships           UserTeamMembership[] // Explicit M2M to Team
  tagsAssignedByThisUser    TeamTagAssignment[]  @relation("TagAssignedBy")
  performanceMetricsSummary Json?
  loginAttempts             LoginAttemptLog[]    @relation("UserLoginAttempts")

  @@index([organizationId])
  // email and agentIdHumanReadable are already indexed due to @unique
  @@index([currentStatus])
  @@index([skills], type: Gin) // GIN index for array field in PostgreSQL for better performance
  @@index([jobTitle])
}

// ============== TEAM / DEPARTMENT (Group) ==================
model Team {
  id            Int     @id @default(autoincrement())
  name          String
  description   String?
  isGeneralTeam Boolean @default(false)

  organizationId Int
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  leadUserId Int?
  // lead       User? @relation("TeamLead", fields: [leadUserId], references: [id], onDelete: SetNull)

  teamMemberships UserTeamMembership[]

  // Explicit M2M with Tag via TeamTagAssignment because we track assignedByUserId
  tagAssignments TeamTagAssignment[] @relation("TagsOnTeam")

  totalChatsLastPeriod Int?   @default(0)
  avgChatSatisfaction  Float?
  goals                Json?

  // Explicit M2M with RoutingRule via RoutingRuleTargetTeam
  routingRuleAssignments RoutingRuleTargetTeam[] @relation("TeamIsTargetOfRule")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([organizationId, name])
  @@index([organizationId])
  @@index([leadUserId])
}

// ============== UserTeamMembership (Explicit Join Model) ==================
model UserTeamMembership {
  userId Int
  teamId Int

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  priorityLevel Int      @default(2)
  assignedAt    DateTime @default(now())

  @@id([userId, teamId]) // Composite Primary Key for SQL join table
  @@index([teamId, priorityLevel])
}

// ============== TAG ==================
model Tag {
  id          Int     @id @default(autoincrement())
  name        String
  description String?

  organizationId Int
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  // Explicit M2M with Team via TeamTagAssignment
  teamAssignments TeamTagAssignment[] @relation("TagAssignments")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([organizationId, name])
  @@index([organizationId])
}

// ============== TeamTagAssignment (Explicit Join Model) ==================
model TeamTagAssignment {
  tagId            Int
  teamId           Int
  assignedByUserId Int

  tag            Tag  @relation("TagAssignments", fields: [tagId], references: [id], onDelete: Cascade)
  team           Team @relation("TagsOnTeam", fields: [teamId], references: [id], onDelete: Cascade)
  assignedByUser User @relation("TagAssignedBy", fields: [assignedByUserId], references: [id], onDelete: Restrict, onUpdate: Cascade)

  assignedAt DateTime @default(now())

  @@id([tagId, teamId]) // Composite Primary Key
  @@index([assignedByUserId])
}

// ============== ROUTING RULE ==================
model RoutingRule {
  id          Int     @id @default(autoincrement())
  name        String
  description String?
  isActive    Boolean @default(true)
  priority    Int
  conditions  Json

  organizationId Int
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)

  // Explicit M2M with Team via RoutingRuleTargetTeam
  targetTeamAssignments RoutingRuleTargetTeam[] @relation("RuleTargetsTeam")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([organizationId, isActive, priority])
}

// ============== ROUTING RULE - TARGET TEAM (Explicit Join Model) ==================
model RoutingRuleTargetTeam {
  routingRuleId Int
  teamId        Int

  routingRule RoutingRule @relation("RuleTargetsTeam", fields: [routingRuleId], references: [id], onDelete: Cascade)
  team        Team        @relation("TeamIsTargetOfRule", fields: [teamId], references: [id], onDelete: Cascade)

  // assignedAt DateTime @default(now()) // Optional if you need to track when this link was made

  @@id([routingRuleId, teamId]) // Composite Primary Key
}

// ============== LOGIN ATTEMPT LOG ==================
model LoginAttemptLog {
  id                 Int      @id @default(autoincrement())
  timestamp          DateTime @default(now())
  userId             Int?
  user               User?    @relation("UserLoginAttempts", fields: [userId], references: [id], onDelete: SetNull)
  attemptedEmail     String
  eventType          String
  ipAddress          String?
  userAgent          String?
  failureReason      String?
  twoFactorAttempted Boolean  @default(false)
  twoFactorPassed    Boolean?

  organizationId Int?
  organization   Organization? @relation(fields: [organizationId], references: [id], onDelete: SetNull)

  @@index([timestamp])
  @@index([userId])
  @@index([attemptedEmail])
  @@index([eventType])
  @@index([ipAddress])
  @@index([organizationId])
}

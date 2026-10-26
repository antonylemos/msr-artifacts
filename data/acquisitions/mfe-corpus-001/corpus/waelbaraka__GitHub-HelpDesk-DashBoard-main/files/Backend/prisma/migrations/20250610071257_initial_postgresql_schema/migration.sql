-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "tagline" TEXT,
    "mainPhoneNumber" TEXT,
    "supportEmail" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "stateProvince" TEXT,
    "zipPostalCode" TEXT,
    "country" TEXT,
    "twitterUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "storeWebsiteUrl" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Etc/UTC',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "defaultLanguage" TEXT NOT NULL DEFAULT 'en',
    "weekStartsOn" TEXT NOT NULL DEFAULT 'sunday',
    "chatAssignmentMode" TEXT NOT NULL DEFAULT 'auto',
    "defaultOperatingHours" JSONB,
    "industry" TEXT,
    "organizationType" TEXT,
    "subscriptionPlanId" TEXT,
    "subscriptionStatus" TEXT,
    "billingContactEmail" TEXT,
    "paymentProcessorId" TEXT,
    "trialEndsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" JSONB NOT NULL,
    "isSystemRole" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "agentIdHumanReadable" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "profilePictureUrl" TEXT,
    "phoneNumber" TEXT,
    "jobTitle" TEXT,
    "isActiveAccount" BOOLEAN NOT NULL DEFAULT true,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "deactivationDetails" JSONB,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "organizationId" INTEGER NOT NULL,
    "permissionOverrides" JSONB,
    "invitationToken" TEXT,
    "invitationExpires" TIMESTAMP(3),
    "invitedByUserId" INTEGER,
    "timezone" TEXT,
    "skills" TEXT[],
    "currentStatus" TEXT,
    "lastStatusChangeAtUtc" TIMESTAMP(3),
    "statusReason" TEXT,
    "maxConcurrentChats" INTEGER DEFAULT 3,
    "currentActiveChatsCount" INTEGER DEFAULT 0,
    "dailyAssignedTicketsCount" INTEGER DEFAULT 0,
    "weeklyAssignedTicketsCount" INTEGER DEFAULT 0,
    "workingHours" JSONB,
    "availabilityOverrides" JSONB,
    "preferredSystemLanguage" TEXT,
    "preferredNotificationChannels" TEXT[] DEFAULT ARRAY['email']::TEXT[],
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "lastTrainingSessionAt" TIMESTAMP(3),
    "certifications" JSONB,
    "currentWorkLocationType" TEXT,
    "currentWorkLocationDetails" JSONB,
    "customFields" JSONB,
    "createdByUserId" INTEGER,
    "lastUpdatedByUserId" INTEGER,
    "lastPasswordChangeAt" TIMESTAMP(3),
    "twoFactorSecret" TEXT,
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "joinedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "performanceMetricsSummary" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isGeneralTeam" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" INTEGER NOT NULL,
    "leadUserId" INTEGER,
    "totalChatsLastPeriod" INTEGER DEFAULT 0,
    "avgChatSatisfaction" DOUBLE PRECISION,
    "goals" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTeamMembership" (
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "priorityLevel" INTEGER NOT NULL DEFAULT 2,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTeamMembership_pkey" PRIMARY KEY ("userId","teamId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "organizationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTagAssignment" (
    "tagId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "assignedByUserId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamTagAssignment_pkey" PRIMARY KEY ("tagId","teamId")
);

-- CreateTable
CREATE TABLE "RoutingRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL,
    "conditions" JSONB NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoutingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutingRuleTargetTeam" (
    "routingRuleId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "RoutingRuleTargetTeam_pkey" PRIMARY KEY ("routingRuleId","teamId")
);

-- CreateTable
CREATE TABLE "LoginAttemptLog" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "attemptedEmail" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "failureReason" TEXT,
    "twoFactorAttempted" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorPassed" BOOLEAN,
    "organizationId" INTEGER,

    CONSTRAINT "LoginAttemptLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Role_organizationId_idx" ON "Role"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_organizationId_name_key" ON "Role"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "User_agentIdHumanReadable_key" ON "User"("agentIdHumanReadable");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON "User"("emailVerificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordResetToken_key" ON "User"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_invitationToken_key" ON "User"("invitationToken");

-- CreateIndex
CREATE INDEX "User_organizationId_idx" ON "User"("organizationId");

-- CreateIndex
CREATE INDEX "User_currentStatus_idx" ON "User"("currentStatus");

-- CreateIndex
CREATE INDEX "User_skills_idx" ON "User" USING GIN ("skills");

-- CreateIndex
CREATE INDEX "User_jobTitle_idx" ON "User"("jobTitle");

-- CreateIndex
CREATE INDEX "Team_organizationId_idx" ON "Team"("organizationId");

-- CreateIndex
CREATE INDEX "Team_leadUserId_idx" ON "Team"("leadUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_organizationId_name_key" ON "Team"("organizationId", "name");

-- CreateIndex
CREATE INDEX "UserTeamMembership_teamId_priorityLevel_idx" ON "UserTeamMembership"("teamId", "priorityLevel");

-- CreateIndex
CREATE INDEX "Tag_organizationId_idx" ON "Tag"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_organizationId_name_key" ON "Tag"("organizationId", "name");

-- CreateIndex
CREATE INDEX "TeamTagAssignment_assignedByUserId_idx" ON "TeamTagAssignment"("assignedByUserId");

-- CreateIndex
CREATE INDEX "RoutingRule_organizationId_isActive_priority_idx" ON "RoutingRule"("organizationId", "isActive", "priority");

-- CreateIndex
CREATE INDEX "LoginAttemptLog_timestamp_idx" ON "LoginAttemptLog"("timestamp");

-- CreateIndex
CREATE INDEX "LoginAttemptLog_userId_idx" ON "LoginAttemptLog"("userId");

-- CreateIndex
CREATE INDEX "LoginAttemptLog_attemptedEmail_idx" ON "LoginAttemptLog"("attemptedEmail");

-- CreateIndex
CREATE INDEX "LoginAttemptLog_eventType_idx" ON "LoginAttemptLog"("eventType");

-- CreateIndex
CREATE INDEX "LoginAttemptLog_ipAddress_idx" ON "LoginAttemptLog"("ipAddress");

-- CreateIndex
CREATE INDEX "LoginAttemptLog_organizationId_idx" ON "LoginAttemptLog"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRoles_AB_unique" ON "_UserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeamMembership" ADD CONSTRAINT "UserTeamMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeamMembership" ADD CONSTRAINT "UserTeamMembership_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTagAssignment" ADD CONSTRAINT "TeamTagAssignment_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTagAssignment" ADD CONSTRAINT "TeamTagAssignment_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTagAssignment" ADD CONSTRAINT "TeamTagAssignment_assignedByUserId_fkey" FOREIGN KEY ("assignedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingRule" ADD CONSTRAINT "RoutingRule_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingRuleTargetTeam" ADD CONSTRAINT "RoutingRuleTargetTeam_routingRuleId_fkey" FOREIGN KEY ("routingRuleId") REFERENCES "RoutingRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutingRuleTargetTeam" ADD CONSTRAINT "RoutingRuleTargetTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttemptLog" ADD CONSTRAINT "LoginAttemptLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttemptLog" ADD CONSTRAINT "LoginAttemptLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

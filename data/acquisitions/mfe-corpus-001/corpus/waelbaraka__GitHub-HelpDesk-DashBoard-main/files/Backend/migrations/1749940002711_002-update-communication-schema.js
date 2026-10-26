// --- In your migration file ---

export const shorthands = undefined;

export function up(pgm) {
  // --- ENUM TYPES (ensure these are comprehensive enough) ---
  pgm.createType('client_segment_enum', ['VIP', 'Standard', 'New_Prospect', 'At_Risk', 'Churned', 'Internal_Test'], { ifNotExists: true });
  pgm.createType('channel_type_enum', ['whatsapp', 'facebook_messenger', 'instagram_dm', 'livechat_widget', 'sms', 'email', 'api', 'phone_call_log', 'internal_note_thread'], { ifNotExists: true });
  pgm.createType('conversation_status_enum', ['new', 'open', 'pending_agent_reply', 'pending_client_reply', 'on_hold_agent', 'on_hold_client', 'resolved_by_agent', 'resolved_by_client', 'closed_by_system', 'abandoned_by_client', 'spam', 'archived'], { ifNotExists: true });
  pgm.createType('message_sender_type_enum', ['agent', 'client', 'system', 'bot', 'automation'], { ifNotExists: true });
  pgm.createType('message_type_enum', ['text', 'image', 'video', 'audio', 'file', 'template_whatsapp', 'location', 'interactive_reply', 'sticker', 'form_submission', 'voice_note', 'system_event'], { ifNotExists: true });
  pgm.createType('message_status_enum', ['pending_send', 'sent_to_channel', 'delivered_to_channel', 'delivered_to_recipient', 'read_by_recipient', 'failed_to_send', 'deleted_by_sender', 'deleted_by_system'], { ifNotExists: true });

  // === CLIENT ===
  pgm.createTable('Client', {
    id: 'id',
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    
    name: { type: 'varchar(255)' },
    firstName: { type: 'varchar(120)' },
    lastName: { type: 'varchar(120)' },
    email: { type: 'citext' },
    phoneNumber: { type: 'varchar(50)' }, // Primary for calls/SMS
    profileNameWhatsapp: { type: 'varchar(255)' },
    whatsappSenderId: { type: 'varchar(100)', comment: 'E.164 phone number for WhatsApp or business-scoped ID.' },
    facebookPsId: { type: 'varchar(100)' },
    instagramId: { type: 'varchar(100)' },
   otherIdentifiers: { type: 'jsonb[]', default: pgm.func(`ARRAY[]::jsonb[]`) }, // Fixed default

    avatarUrl: { type: 'text' },
    languagePreference: { type: 'varchar(10)', default: 'en' },
    userSegment: { type: 'client_segment_enum' },
    timezone: { type: 'varchar(100)' },

    assignedAgentId: { type: 'integer', references: '"User"(id) ON DELETE SET NULL' },
    firstSeenAtUtc: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
    lastSeenAtUtc: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
    firstInteractionChannel: { type: 'channel_type_enum' },

    totalConversationsCount: { type: 'integer', default: 0, notNull: true },
    totalTicketsCount: { type: 'integer', default: 0, notNull: true },
    openTicketsCount: { type: 'integer', default: 0, notNull: true },
    averageChatSatisfactionScore: { type: 'numeric(3, 2)' },
    averageTicketSatisfactionScore: { type: 'numeric(3, 2)' },

    tags: { type: 'text[]', default: '{}' },
      notes: { type: 'jsonb[]', default: pgm.func(`ARRAY[]::jsonb[]`) }, // Fixed default

    customAttributes: { type: 'jsonb', default: '{}' },
    optInStatus: { type: 'jsonb', default: '{}' },

    isBanned: { type: 'boolean', default: false, notNull: true },
    banDetails: { type: 'jsonb' },
  previousBanHistory: { type: 'jsonb[]', default: pgm.func(`ARRAY[]::jsonb[]`) }, // Fixed default

    createdAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') }
  });
  // Indexes from previous definition are good.
  // Consider adding a UNIQUE constraint for (organizationId, whatsappSenderId) if a WhatsApp number should only map to one client per org.
  pgm.addConstraint('Client', 'client_org_whatsapp_unique', { unique: ['organizationId', 'whatsappSenderId'], where: '"whatsappSenderId" IS NOT NULL'});


  // === CONVERSATION ===
  pgm.createTable('Conversation', {
    id: 'id',
    organizationId: { type: 'integer', notNull: true, references: '"Organization"(id) ON DELETE CASCADE' },
    clientId: { type: 'integer', notNull: true, references: '"Client"(id) ON DELETE CASCADE' },
    whatsappSenderIdSnapshot: { type: 'varchar(100)' },
    
    assignedAgentId: { type: 'integer', references: '"User"(id) ON DELETE SET NULL' },
    assignedAgentNameSnapshot: { type: 'varchar(255)' },
    teamId: { type: 'integer', references: '"Team"(id) ON DELETE SET NULL' },
    
    status: { type: 'conversation_status_enum', notNull: true, default: 'new' }, // Default to 'new' instead of 'pending_handoff'
    sourceChannel: { type: 'channel_type_enum', notNull: true },
    chatSource: { type: 'text' },
    externalChannelConversationId: { type: 'varchar(255)', comment: 'e.g., WhatsApp CAPI convo ID, FB thread ID' },
    
    userLanguagePreferenceSnapshot: { type: 'varchar(10)' },
    userSegmentSnapshot: { type: 'client_segment_enum' },
    entryPointUrl: { type: 'text' },
    proactiveChatCampaignId: { type: 'varchar(100)' }, // Could reference a Campaign table
    conversationSummaryBot: { type: 'text' },
    
    // Example: [{ "field_id": "name", "label": "Your Name", "value": "John Doe", "type": "text" }, ...]
     preHandoffData: { type: 'jsonb[]', default: pgm.func(`ARRAY[]::jsonb[]`), comment: 'Array of form submissions...' }, // Fixed default
  userFeedback: { type: 'jsonb[]', default: pgm.func(`ARRAY[]::jsonb[]`), comment: 'Array of form submissions...' }, // Fixed default    
    createdAtUtc: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') }, // When created in DB
    initiatedAtUtc: { type: 'timestamptz', comment: 'Timestamp when the actual interaction started (e.g. first client message)' }, // NEW
    lastInteractionAtUtc: { type: 'timestamptz', default: pgm.func('current_timestamp') },
    lastStatusUpdateAtUtc: { type: 'timestamptz', default: pgm.func('current_timestamp') },
    agentJoinedAtUtc: { type: 'timestamptz' },
    firstAgentResponseAtUtc: { type: 'timestamptz' },
    lastAgentReplyAtUtc: { type: 'timestamptz' },       // Was lastAgentReplyAt
    lastClientReplyAtUtc: { type: 'timestamptz' },      // Was lastContactReplyAt
    resolvedAtUtc: { type: 'timestamptz' },
    closedAtUtc: { type: 'timestamptz' },               // NEW: When finally closed by system/policy after resolution
    resolvedByAgentIdRef: { type: 'integer', references: '"User"(id) ON DELETE SET NULL' },
    resolutionNotes: { type: 'text' },
    
    totalChatDurationSeconds: { type: 'integer' },
    resolutionTimeSeconds: { type: 'integer' },
    firstResponseTimeSeconds: { type: 'integer' },
    holdTimeSeconds: { type: 'integer', default: 0 },
    wrapUpTimeSeconds: { type: 'integer', default: 0 },
    
    tags: { type: 'text[]', default: '{}' },
    priority: { type: 'integer', default: 2, comment: '1-High, 2-Medium, 3-Low' },
    
    // Renaming for clarity, these link TO other entities FROM the conversation
    generatedTicketId: { type: 'integer' /*, references: '"Ticket"(id) ON DELETE SET NULL' */ },
    generatedAppointmentIds: { type: 'integer[]', default: '{}' }, // Renamed
    // If a conversation IS a follow-up TO a ticket (ticket initiated first)
    followUpToTicketId: { type: 'integer' /*, references: '"Ticket"(id) ON DELETE SET NULL' */ }, // Renamed

  lifecycleEvents: { type: 'jsonb[]', default: pgm.func(`ARRAY[]::jsonb[]`) }, // Fixed default

    // Removed `createdAt` and `updatedAt` to avoid confusion with `createdAtUtc` etc.
    // If needed, re-add standard `createdAt` / `updatedAt` and manage them with triggers.
    // For this context, `createdAtUtc` and `lastInteractionAtUtc` are often more meaningful.
  });
  // Indexes from previous definition are good.

  // === MESSAGE ===
  pgm.createTable('Message', {
    id: 'id',
    conversationId: { type: 'integer', notNull: true, references: '"Conversation"(id) ON DELETE CASCADE' },
    
    senderType: { type: 'message_sender_type_enum', notNull: true },
    senderId: { type: 'varchar(255)', comment: 'User.id, Client.whatsappSenderId, Bot.id, "SYSTEM"' }, 
    senderNameSnapshot: { type: 'varchar(255)', comment: 'Display name of sender at time of message (agent name, client name/number).' }, // NEW

    messageType: { type: 'message_type_enum', notNull: true, default: 'text' },
    content: { type: 'text', comment: 'Text content or caption for media.' }, // NotNull removed: for some types like location, content might be in interactiveData
    
    mediaUrl: { type: 'text' },
    mediaMimeType: { type: 'varchar(100)' },
    mediaSize: { type: 'integer' },
    mediaFilename: { type: 'text' },
    thumbnailUrl: { type: 'text' }, // NEW: For image/video previews
    
    // Example: {"type": "button_reply", "button_payload": "order_status_123", "button_text": "Check Status"}
    // Example: {"type": "list_reply", "list_item_id": "option_2", "list_item_text": "Product B"}
    interactiveData: { type: 'jsonb' },
    
    isInternalNote: { type: 'boolean', notNull: true, default: false },
    
    status: { type: 'message_status_enum', notNull: true, default: 'pending_send' },
    channelMessageId: { type: 'varchar(255)', unique: true }, // Important: must be unique across all messages
    
    // Timestamps
    clientTimestamp: { type: 'timestamptz', comment: 'Timestamp from the client device, if available and reliable.' }, // NEW
    channelTimestamp: { type: 'timestamptz', comment: 'Timestamp when message received by/sent from the channel API (e.g., WhatsApp server time).' }, // NEW
    
    sentAt: { type: 'timestamptz', comment: 'Timestamp when successfully handed off to channel for sending (from our system).' },
    deliveredToChannelAt: { type: 'timestamptz' }, // NEW: Confirmed delivery to WhatsApp/FB server
    deliveredToRecipientAt: { type: 'timestamptz' }, // Renamed
    readByRecipientAt: { type: 'timestamptz' },      // Renamed
    
    failureReason: { type: 'text' },
    errorCode: { type: 'varchar(50)' }, // NEW: For specific error codes from channels

    quotedMessageId: { type: 'varchar(255)', comment: 'channelMessageId of the message this one is replying to.' }, // NEW
    forwardedFrom: { type: 'jsonb', comment: 'Info if this message was forwarded (e.g. {"source_number": "...", "is_frequently_forwarded": true})' }, // NEW

    // For messages generated by automations/flows
    automationFlowId: { type: 'varchar(100)' }, // NEW: Could reference a Flow table ID
    automationNodeId: { type: 'varchar(100)' }, // NEW: Node within the flow that sent this

    createdAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') }
  });
  // Indexes from previous definition are good.
  pgm.createIndex('Message', ['conversationId', 'channelMessageId']); // Good for idempotency if channelMessageId is not globally unique

  // -- TRIGGERS FOR `updatedAt` --
  // (Assuming trigger_set_timestamp function is already created)
 
 
 
// -- TRIGGERS FOR `updatedAt` --
// Add this function creation BEFORE creating triggers
pgm.sql(`
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`);

['Client'].forEach(tableName => {
  pgm.sql(`
    CREATE TRIGGER set_timestamp_on_${tableName.toLowerCase()}_update
    BEFORE UPDATE ON "${tableName}"
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();
  `);
});

  // Specific trigger for Conversation.updatedAt, maybe based on lastInteractionAtUtc
  pgm.sql(`
    CREATE OR REPLACE FUNCTION trigger_set_conversation_updatedat()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW."updatedAt" = COALESCE(NEW."lastInteractionAtUtc", NEW."createdAtUtc", NOW());
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER set_timestamp_on_conversation_update
    BEFORE INSERT OR UPDATE ON "Conversation"
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_conversation_updatedat();
  `);
};

export function down(pgm) {
  // Drop triggers first
  ['Client', 'Conversation'].forEach(tableName => {
    pgm.sql(`DROP TRIGGER IF EXISTS set_timestamp_on_${tableName.toLowerCase()}_update ON "${tableName}";`);
  });
  pgm.sql(`DROP FUNCTION IF EXISTS trigger_set_conversation_updatedat();`);
  pgm.sql(`DROP FUNCTION IF EXISTS trigger_set_timestamp();`); // Add this line
  
  // Potentially drop trigger_set_timestamp() if no other table uses it

  pgm.dropTable('Message', { ifExists: true, cascade: true });
  pgm.dropTable('Conversation', { ifExists: true, cascade: true });
  pgm.dropTable('Client', { ifExists: true, cascade: true });

  pgm.dropType('message_status_enum', { ifExists: true });
  pgm.dropType('message_type_enum', { ifExists: true });
  pgm.dropType('message_sender_type_enum', { ifExists: true });
  pgm.dropType('conversation_status_enum', { ifExists: true });
  pgm.dropType('channel_type_enum', { ifExists: true });
  pgm.dropType('client_segment_enum', { ifExists: true });
};
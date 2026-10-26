// migrations/TIMESTAMP_003_add_whatsapp_channel_table.js
export const shorthands = undefined;

export function up(pgm) {
  pgm.createType('whatsapp_provider_enum', ['twilio', 'meta_cloud_api', 'other_bsp']);

  pgm.createTable('WhatsAppChannel', {
    id: 'id',
    organizationId: { 
      type: 'integer', 
      notNull: true, 
      references: '"Organization"(id) ON DELETE CASCADE' 
    },
    channelName: { type: 'varchar(255)', notNull: true, comment: 'User-friendly name for the channel, e.g., "Sales WhatsApp Line"' },
    phoneNumber: { type: 'varchar(50)', notNull: true, comment: 'The WhatsApp enabled phone number (E.164 format).' },
    provider: { type: 'whatsapp_provider_enum', notNull: true },
    
    // Store provider-specific credentials securely (ideally encrypted or referencing a secret manager)
    // For Twilio:
    twilioAccountSid: { type: 'text' },
    twilioAuthToken: { type: 'text' }, // Should be encrypted at rest
    twilioMessagingServiceSid: { type: 'text', comment: 'Optional, for using Twilio Messaging Services.' },

    // For Meta Cloud API:
    metaPhoneNumberId: { type: 'text' },
    metaBusinessAccountId: { type: 'text' },
    metaAccessToken: { type: 'text' }, // Should be encrypted at rest, and it expires!

    // Common
    webhookVerificationToken: { type: 'text', comment: 'A token you define to verify incoming webhooks.' },
    isActive: { type: 'boolean', notNull: true, default: false }, // Channel is only active after successful configuration/verification
    
    // Max number of concurrent messages this channel can send (if provider has limits)
    // messageRateLimit: {type: 'integer'}, 
    
    createdAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
    updatedAt: { type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') }
  });

  pgm.addConstraint('WhatsAppChannel', 'whatsapp_channel_org_phone_unique', { 
    unique: ['organizationId', 'phoneNumber'] 
  });
  pgm.createIndex('WhatsAppChannel', 'organizationId');
  pgm.createIndex('WhatsAppChannel', 'phoneNumber');

  // Add trigger for updatedAt
  pgm.sql(`
    CREATE TRIGGER set_timestamp_on_whatsappchannel_update
    BEFORE UPDATE ON "WhatsAppChannel"
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp(); 
  `); // Assumes trigger_set_timestamp() function exists
};

export function down(pgm) {
  pgm.dropTable('WhatsAppChannel', { ifExists: true, cascade: true });
  pgm.dropType('whatsapp_provider_enum', { ifExists: true });
  // Drop trigger if you created it specifically for this table and it's not shared
  // pgm.sql(`DROP TRIGGER IF EXISTS set_timestamp_on_whatsappchannel_update ON "WhatsAppChannel";`);
};
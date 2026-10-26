/* eslint-disable camelcase */
export const shorthands = undefined;

export function up(pgm) {
  // Drop any old trigger that might have been on INSERT OR UPDATE
  pgm.sql(`DROP TRIGGER IF EXISTS set_timestamp_on_conversation_update ON "Conversation";`);
  pgm.sql(`DROP TRIGGER IF EXISTS manage_conversation_timestamps_trigger ON "Conversation";`); // If you tried Solution 2

  // Create the trigger that uses the generic function, but ONLY for UPDATEs
  pgm.sql(`
    CREATE TRIGGER conversation_updatedat_on_update_trigger
    BEFORE UPDATE ON "Conversation"
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_updatedat_on_update(); 
  `);
  // The trigger_set_updatedat_on_update() function should exist from the previous migration (or an earlier one for Client).
};

export function down(pgm) {
  pgm.sql(`DROP TRIGGER IF EXISTS conversation_updatedat_on_update_trigger ON "Conversation";`);
  // Re-create old trigger if necessary for perfect rollback, but often not needed if moving forward.
};
/* eslint-disable camelcase */
export const shorthands = undefined;

export function up(pgm) {
  // Add the 'updatedAt' column to the "Conversation" table
  // It's NOT NULL and will default to the current timestamp for new rows
  // and when old rows are first updated by the trigger we will create later.
  pgm.addColumn('Conversation', {
    updatedAt: { 
      type: 'timestamptz', 
      notNull: true, 
      default: pgm.func('current_timestamp') 
    }
  });

  // If you want to backfill existing rows (optional, but good practice)
  pgm.sql(`UPDATE "Conversation" SET "updatedAt" = "lastInteractionAtUtc" WHERE "updatedAt" IS NULL;`);
  pgm.sql(`UPDATE "Conversation" SET "updatedAt" = "createdAtUtc" WHERE "updatedAt" IS NULL;`);


  // IMPORTANT: We also need the generic trigger function if it doesn't exist from previous migrations
  // This is the function that sets NEW."updatedAt" = NOW()
  pgm.sql(`
    CREATE OR REPLACE FUNCTION trigger_set_updatedat_on_update()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW."updatedAt" = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);
};

export function down(pgm) {
  pgm.dropColumn('Conversation', 'updatedAt');
  // Do not drop the trigger_set_updatedat_on_update() function here
  // as other tables (like Client) might still be using it via their own triggers.
  // It's a generic function.
};
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;
/* eslint-disable camelcase */

export const up = (pgm) => {
  // Add the 'lastInteractionAtUtc' column to the "Client" table
  pgm.addColumn('Client', {
    lastInteractionAtUtc: { 
      type: 'timestamptz', 
      // It can be null initially if a client is created without immediate interaction
      // Or, you can default it to 'createdAt' or 'firstSeenAtUtc' if that makes sense for your logic
      // For instance, if 'firstSeenAtUtc' is always an interaction:
      // default: pgm.func('current_timestamp') // Or copy from another field on insert/update
    }
  });

  // Optional: Backfill existing rows. 
  // If you have a 'lastSeenAtUtc' that closely represents last interaction, you can use it.
  // Otherwise, new interactions will start populating it.
  pgm.sql(`
    UPDATE "Client" SET "lastInteractionAtUtc" = "lastSeenAtUtc" 
    WHERE "lastInteractionAtUtc" IS NULL AND "lastSeenAtUtc" IS NOT NULL;
  `);
  // If no good source for backfill, new interactions will populate it.

  // Add an index if you plan to query or sort by this field frequently
  pgm.createIndex('Client', 'lastInteractionAtUtc');
};

export function down(pgm) {
  pgm.dropIndex('Client', 'lastInteractionAtUtc', { ifExists: true });
  pgm.dropColumn('Client', 'lastInteractionAtUtc', { ifExists: true });
};

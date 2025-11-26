import pool from '../config/database.js';

async function addVerifiedColumn() {
  try {
    console.log('Adding verified column to businesses table...');

    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE;
    `);
    console.log('✓ Added verified column');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_verified ON businesses(verified);
    `);
    console.log('✓ Created index on verified column');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addVerifiedColumn();


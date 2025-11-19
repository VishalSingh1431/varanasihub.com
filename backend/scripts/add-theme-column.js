import pool from '../config/database.js';

async function addThemeColumn() {
  try {
    console.log('Adding theme column to businesses table...');

    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS theme VARCHAR(50) DEFAULT 'modern';
    `);
    console.log('✓ Added theme column');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addThemeColumn();


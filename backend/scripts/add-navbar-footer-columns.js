import pool from '../config/database.js';

async function addNavbarFooterColumns() {
  try {
    console.log('Adding navbar_tagline and footer_description columns to businesses table...');

    // Add navbar_tagline column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS navbar_tagline TEXT;
    `);
    console.log('✓ Added navbar_tagline column');

    // Add footer_description column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS footer_description TEXT;
    `);
    console.log('✓ Added footer_description column');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addNavbarFooterColumns();


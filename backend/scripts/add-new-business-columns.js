import pool from '../config/database.js';

async function addNewBusinessColumns() {
  try {
    console.log('Adding new columns to businesses table...');

    // Add services column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]'::jsonb;
    `);
    console.log('✓ Added services column');

    // Add special_offers column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS special_offers JSONB DEFAULT '[]'::jsonb;
    `);
    console.log('✓ Added special_offers column');

    // Add business_hours column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS business_hours JSONB DEFAULT '{}'::jsonb;
    `);
    console.log('✓ Added business_hours column');

    // Add appointment_settings column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS appointment_settings JSONB DEFAULT '{}'::jsonb;
    `);
    console.log('✓ Added appointment_settings column');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addNewBusinessColumns();


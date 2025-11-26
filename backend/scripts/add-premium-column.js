import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Add is_premium column to businesses table
 */
async function addPremiumColumn() {
  try {
    console.log('🔄 Adding is_premium column to businesses table...');

    // Check if column already exists
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='businesses' AND column_name='is_premium';
    `;
    const checkResult = await pool.query(checkQuery);

    if (checkResult.rows.length > 0) {
      console.log('✅ Column is_premium already exists');
      return;
    }

    // Add is_premium column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN is_premium BOOLEAN DEFAULT FALSE NOT NULL;
    `);

    // Add index for faster sorting
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_is_premium ON businesses(is_premium);
    `);

    console.log('✅ Successfully added is_premium column and index');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding is_premium column:', error);
    process.exit(1);
  }
}

addPremiumColumn();


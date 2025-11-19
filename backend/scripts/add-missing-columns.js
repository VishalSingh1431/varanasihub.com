import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

/**
 * Migration script to add missing columns to users table
 * Run this with: node backend/scripts/add-missing-columns.js
 */
async function addMissingColumns() {
  try {
    console.log('🔄 Starting migration...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to database');

    // Check and add picture column
    const pictureCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'picture'
    `);
    
    if (pictureCheck.rows.length === 0) {
      await pool.query(`ALTER TABLE users ADD COLUMN picture TEXT`);
      console.log('✅ Added "picture" column to users table');
    } else {
      console.log('ℹ️  "picture" column already exists');
    }

    // Check and add google_id column
    const googleIdCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'google_id'
    `);
    
    if (googleIdCheck.rows.length === 0) {
      await pool.query(`ALTER TABLE users ADD COLUMN google_id VARCHAR(255)`);
      console.log('✅ Added "google_id" column to users table');
    } else {
      console.log('ℹ️  "google_id" column already exists');
    }

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Error code:', error.code);
    process.exit(1);
  }
}

addMissingColumns();


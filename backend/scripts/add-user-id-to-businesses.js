import pool from '../config/database.js';

async function addUserIdToBusinesses() {
  try {
    console.log('Adding user_id column to businesses table...');

    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
    `);
    console.log('✓ Added user_id column');

    // Create index for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
    `);
    console.log('✓ Created index on user_id');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addUserIdToBusinesses();


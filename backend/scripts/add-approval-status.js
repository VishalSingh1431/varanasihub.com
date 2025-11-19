import pool from '../config/database.js';

async function addApprovalStatus() {
  try {
    console.log('Adding approval status columns to businesses table...');

    // Add edit_approval_status column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS edit_approval_status VARCHAR(50) DEFAULT 'none' CHECK (edit_approval_status IN ('none', 'pending', 'approved', 'rejected'));
    `);
    console.log('✓ Added edit_approval_status column');

    // Update existing businesses status to 'approved' if they are 'active'
    await pool.query(`
      UPDATE businesses SET status = 'approved' WHERE status = 'active'
    `);
    console.log('✓ Updated existing active businesses to approved status');

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
      CREATE INDEX IF NOT EXISTS idx_businesses_edit_approval_status ON businesses(edit_approval_status);
    `);
    console.log('✓ Created indexes');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addApprovalStatus();


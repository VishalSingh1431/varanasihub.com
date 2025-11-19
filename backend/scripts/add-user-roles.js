import pool from '../config/database.js';

async function addUserRoles() {
  try {
    console.log('Adding user roles to database...');

    // Check if role column exists
    const roleColumnExists = await pool.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'role'
    `);

    if (roleColumnExists.rows.length === 0) {
      // Add role column to users table
      await pool.query(`
        ALTER TABLE users 
        ADD COLUMN role VARCHAR(50) DEFAULT 'normal';
      `);
      console.log('✓ Added role column to users table');
      
      // Add check constraint
      await pool.query(`
        ALTER TABLE users 
        ADD CONSTRAINT users_role_check CHECK (role IN ('normal', 'content_admin', 'main_admin'));
      `);
      console.log('✓ Added role check constraint');
    } else {
      // Update existing constraint if needed
      try {
        await pool.query(`
          ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
        `);
        await pool.query(`
          ALTER TABLE users 
          ADD CONSTRAINT users_role_check CHECK (role IN ('normal', 'content_admin', 'main_admin'));
        `);
        console.log('✓ Updated role check constraint');
      } catch (error) {
        console.log('⚠ Constraint already exists or error updating:', error.message);
      }
      
      // Update any invalid roles to 'normal'
      await pool.query(`
        UPDATE users SET role = 'normal' 
        WHERE role IS NULL OR role NOT IN ('normal', 'content_admin', 'main_admin')
      `);
      console.log('✓ Updated invalid roles to normal');
    }

    // Create index for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    `);
    console.log('✓ Created index on role');

    // Set first user as main_admin (if exists)
    const firstUser = await pool.query(`
      SELECT id FROM users ORDER BY id ASC LIMIT 1
    `);
    
    if (firstUser.rows.length > 0) {
      await pool.query(`
        UPDATE users SET role = 'main_admin' WHERE id = $1
      `, [firstUser.rows[0].id]);
      console.log(`✓ Set user ${firstUser.rows[0].id} as main_admin`);
    }

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

addUserRoles();


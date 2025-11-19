import pool from '../config/database.js';
import User from '../models/User.js';

async function updateExistingBusinessesUserId() {
  try {
    console.log('Updating existing businesses with user_id based on email...');

    // Get all businesses without user_id
    const businessesWithoutUserId = await pool.query(`
      SELECT id, email FROM businesses WHERE user_id IS NULL
    `);

    console.log(`Found ${businessesWithoutUserId.rows.length} businesses without user_id`);

    let updated = 0;
    for (const business of businessesWithoutUserId.rows) {
      try {
        // Find user by email
        const user = await User.findByEmail(business.email);
        if (user) {
          await pool.query(`
            UPDATE businesses SET user_id = $1 WHERE id = $2
          `, [user.id, business.id]);
          console.log(`✓ Updated business ${business.id} with user_id ${user.id}`);
          updated++;
        } else {
          console.log(`⚠ No user found for email: ${business.email} (business ${business.id})`);
        }
      } catch (error) {
        console.error(`Error updating business ${business.id}:`, error.message);
      }
    }

    console.log(`\n✅ Updated ${updated} businesses with user_id`);
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

updateExistingBusinessesUserId();


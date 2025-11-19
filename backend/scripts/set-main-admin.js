import pool from '../config/database.js';
import User from '../models/User.js';

async function setMainAdmin() {
  try {
    const email = 'vishalsingh05072003@gmail.com';
    
    console.log(`Setting ${email} as main_admin...`);

    // Find user by email
    const user = await User.findByEmail(email);
    
    if (!user) {
      console.error(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    console.log(`✓ Found user: ${user.name || 'N/A'} (ID: ${user.id})`);
    console.log(`  Current role: ${user.role || 'normal'}`);

    // Update user role to main_admin
    const updatedUser = await User.update(user.id, { role: 'main_admin' });

    console.log(`✓ Updated user role to: ${updatedUser.role}`);
    console.log('✅ User is now main_admin!');
    console.log('\nNote: User may need to log out and log back in to see admin panel.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting main admin:', error);
    process.exit(1);
  }
}

setMainAdmin();


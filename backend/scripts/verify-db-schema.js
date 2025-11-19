import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

/**
 * Verify and fix database schema for users table
 */
async function verifySchema() {
  try {
    console.log('🔄 Verifying database schema...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to database');

    // Get current columns
    const currentColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    console.log('\n📋 Current columns in users table:');
    currentColumns.rows.forEach(row => {
      console.log(`   - ${row.column_name} (${row.data_type})`);
    });

    // Required columns
    const requiredColumns = [
      { name: 'id', type: 'SERIAL PRIMARY KEY', check: false },
      { name: 'email', type: 'VARCHAR(255) NOT NULL UNIQUE', check: true },
      { name: 'name', type: 'VARCHAR(255)', check: true },
      { name: 'phone', type: 'VARCHAR(20)', check: true },
      { name: 'bio', type: 'TEXT', check: true },
      { name: 'picture', type: 'TEXT', check: true },
      { name: 'google_id', type: 'VARCHAR(255)', check: true },
      { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP', check: true },
      { name: 'updated_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP', check: true },
    ];

    console.log('\n🔍 Checking for missing columns...');
    let missingColumns = [];

    for (const col of requiredColumns) {
      if (col.check) {
        const exists = currentColumns.rows.some(row => row.column_name === col.name);
        if (!exists) {
          missingColumns.push(col);
          console.log(`   ❌ Missing: ${col.name}`);
        } else {
          console.log(`   ✅ Found: ${col.name}`);
        }
      }
    }

    if (missingColumns.length > 0) {
      console.log('\n🔧 Adding missing columns...');
      for (const col of missingColumns) {
        try {
          // Extract just the type without constraints for ALTER TABLE
          const typeOnly = col.type
            .replace(/NOT NULL/gi, '')
            .replace(/UNIQUE/gi, '')
            .replace(/DEFAULT CURRENT_TIMESTAMP/gi, '')
            .replace(/PRIMARY KEY/gi, '')
            .trim();
          
          await pool.query(`ALTER TABLE users ADD COLUMN ${col.name} ${typeOnly}`);
          console.log(`   ✅ Added: ${col.name}`);
        } catch (error) {
          console.error(`   ❌ Failed to add ${col.name}:`, error.message);
        }
      }
    } else {
      console.log('\n✅ All required columns exist!');
    }

    // Verify again
    const finalColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    console.log('\n📋 Final columns in users table:');
    finalColumns.rows.forEach(row => {
      console.log(`   - ${row.column_name}`);
    });

    console.log('\n✅ Schema verification completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Schema verification failed:', error.message);
    console.error('Error code:', error.code);
    process.exit(1);
  }
}

verifySchema();


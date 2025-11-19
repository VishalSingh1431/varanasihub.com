import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

/**
 * Script to approve/activate businesses
 * Usage: node backend/scripts/approve-business.js [business-id or 'all']
 */
async function approveBusiness() {
  try {
    const businessId = process.argv[2];
    
    console.log('🔄 Approving business(es)...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to database');

    if (businessId === 'all') {
      // Approve all pending businesses
      const result = await pool.query(`
        UPDATE businesses 
        SET status = 'active', updated_at = CURRENT_TIMESTAMP
        WHERE status = 'pending'
        RETURNING id, business_name, status
      `);
      
      console.log(`✅ Updated ${result.rows.length} businesses to active status:`);
      result.rows.forEach(row => {
        console.log(`   - ${row.business_name} (ID: ${row.id})`);
      });
    } else if (businessId) {
      // Approve specific business
      const result = await pool.query(`
        UPDATE businesses 
        SET status = 'active', updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, business_name, status
      `, [businessId]);
      
      if (result.rows.length === 0) {
        console.log(`❌ Business with ID ${businessId} not found`);
        process.exit(1);
      }
      
      console.log(`✅ Updated business to active status:`);
      console.log(`   - ${result.rows[0].business_name} (ID: ${result.rows[0].id})`);
    } else {
      // Show all businesses and their status
      const result = await pool.query(`
        SELECT id, business_name, status, created_at
        FROM businesses
        ORDER BY created_at DESC
      `);
      
      console.log('\n📋 All businesses:');
      result.rows.forEach(row => {
        const statusIcon = row.status === 'active' ? '✅' : row.status === 'approved' ? '✅' : '⏳';
        console.log(`   ${statusIcon} ${row.business_name} (ID: ${row.id}) - Status: ${row.status}`);
      });
      
      console.log('\n💡 To approve a business, run:');
      console.log('   node backend/scripts/approve-business.js [business-id]');
      console.log('   node backend/scripts/approve-business.js all  (to approve all pending)');
    }

    console.log('\n✅ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error code:', error.code);
    process.exit(1);
  }
}

approveBusiness();


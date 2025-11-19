import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

/**
 * Update existing businesses to use localhost URLs for development
 * Run this if you want to update existing businesses to use localhost subdomains
 */
async function updateBusinessUrls() {
  try {
    console.log('🔄 Updating business URLs for localhost...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to database');

    const port = process.env.PORT || 5000;
    
    // Get all businesses
    const businesses = await pool.query(`
      SELECT id, slug, business_name, subdomain_url, subdirectory_url
      FROM businesses
      ORDER BY id
    `);
    
    console.log(`\n📋 Found ${businesses.rows.length} businesses\n`);
    
    for (const business of businesses.rows) {
      const newSubdomainUrl = `http://${business.slug}.localhost:${port}`;
      const newSubdirectoryUrl = `http://localhost:${port}/${business.slug}`;
      
      // Only update if URL doesn't already contain localhost
      if (!business.subdomain_url.includes('localhost')) {
        await pool.query(`
          UPDATE businesses 
          SET subdomain_url = $1, subdirectory_url = $2, updated_at = CURRENT_TIMESTAMP
          WHERE id = $3
        `, [newSubdomainUrl, newSubdirectoryUrl, business.id]);
        
        console.log(`✅ Updated: ${business.business_name}`);
        console.log(`   Subdomain: ${newSubdomainUrl}`);
        console.log(`   Subdirectory: ${newSubdirectoryUrl}\n`);
      } else {
        console.log(`⏭️  Skipped (already localhost): ${business.business_name}\n`);
      }
    }

    console.log('✅ All businesses updated!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error code:', error.code);
    process.exit(1);
  }
}

updateBusinessUrls();


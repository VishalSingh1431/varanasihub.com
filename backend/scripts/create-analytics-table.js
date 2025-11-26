import pool from '../config/database.js';

async function createAnalyticsTable() {
  try {
    console.log('Creating analytics table...');

    // Check if table exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'analytics'
      );
    `);

    if (tableExists.rows[0].exists) {
      console.log('⚠️ Analytics table already exists. Skipping creation.');
      return;
    }

    // Create analytics table
    await pool.query(`
      CREATE TABLE analytics (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
        visitor_count INTEGER DEFAULT 0,
        call_clicks INTEGER DEFAULT 0,
        whatsapp_clicks INTEGER DEFAULT 0,
        gallery_views INTEGER DEFAULT 0,
        map_clicks INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(business_id)
      );
    `);
    console.log('✓ Created analytics table');

    // Create index for faster lookups
    await pool.query(`
      CREATE INDEX idx_analytics_business_id ON analytics(business_id);
    `);
    console.log('✓ Created index on business_id');

    // Create trigger to update updated_at timestamp
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_analytics_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    console.log('✓ Created update timestamp function');

    await pool.query(`
      CREATE TRIGGER update_analytics_timestamp
      BEFORE UPDATE ON analytics
      FOR EACH ROW
      EXECUTE FUNCTION update_analytics_updated_at();
    `);
    console.log('✓ Created update timestamp trigger');

    // Initialize analytics for existing businesses
    const existingBusinesses = await pool.query('SELECT id FROM businesses');
    if (existingBusinesses.rows.length > 0) {
      const values = existingBusinesses.rows.map((row, index) => `($${index + 1})`).join(', ');
      const businessIds = existingBusinesses.rows.map(row => row.id);
      
      await pool.query(`
        INSERT INTO analytics (business_id)
        VALUES ${values}
        ON CONFLICT (business_id) DO NOTHING
      `, businessIds);
      console.log(`✓ Initialized analytics for ${existingBusinesses.rows.length} existing businesses`);
    }

    console.log('✅ Analytics table setup completed successfully!');
  } catch (error) {
    console.error('❌ Error creating analytics table:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

createAnalyticsTable();


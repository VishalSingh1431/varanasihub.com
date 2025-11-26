import pool from '../config/database.js';

async function createAnalyticsEventsTable() {
  try {
    console.log('Creating analytics_events table for time-based tracking...');

    // Check if table exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'analytics_events'
      );
    `);

    if (tableExists.rows[0].exists) {
      console.log('⚠️ Analytics events table already exists. Skipping creation.');
      return;
    }

    // Create analytics_events table
    await pool.query(`
      CREATE TABLE analytics_events (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
        event_type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Created analytics_events table');

    // Create indexes for faster queries
    await pool.query(`
      CREATE INDEX idx_analytics_events_business_id ON analytics_events(business_id);
    `);
    console.log('✓ Created index on business_id');

    await pool.query(`
      CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
    `);
    console.log('✓ Created index on event_type');

    await pool.query(`
      CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
    `);
    console.log('✓ Created index on created_at');

    await pool.query(`
      CREATE INDEX idx_analytics_events_business_created ON analytics_events(business_id, created_at);
    `);
    console.log('✓ Created composite index on business_id and created_at');

    console.log('✅ Analytics events table setup completed successfully!');
  } catch (error) {
    console.error('❌ Error creating analytics events table:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

createAnalyticsEventsTable();


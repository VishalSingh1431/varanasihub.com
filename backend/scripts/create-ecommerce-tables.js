import pool from '../config/database.js';

async function createEcommerceTables() {
  try {
    console.log('Creating e-commerce tables...');

    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        compare_at_price DECIMAL(10, 2),
        image_url TEXT,
        images_url JSONB DEFAULT '[]'::jsonb,
        category VARCHAR(100),
        stock_quantity INTEGER DEFAULT 0,
        sku VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock')),
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created products table');

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(20) NOT NULL,
        customer_address TEXT,
        items JSONB NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        tax DECIMAL(10, 2) DEFAULT 0,
        shipping DECIMAL(10, 2) DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
        payment_method VARCHAR(50),
        payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
        notes TEXT,
        notification_sent BOOLEAN DEFAULT FALSE,
        notification_method VARCHAR(50) CHECK (notification_method IN ('whatsapp', 'email', 'both')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created orders table');

    // Create contact_form_submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_form_submissions (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created contact_form_submissions table');

    // Create ab_test_variants table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ab_test_variants (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
        variant_name VARCHAR(100) NOT NULL,
        layout_type VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        visitor_count INTEGER DEFAULT 0,
        conversion_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(business_id, variant_name)
      )
    `);
    console.log('✓ Created ab_test_variants table');

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_products_business_id ON products(business_id);
      CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
      CREATE INDEX IF NOT EXISTS idx_orders_business_id ON orders(business_id);
      CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_business_id ON contact_form_submissions(business_id);
      CREATE INDEX IF NOT EXISTS idx_ab_test_business_id ON ab_test_variants(business_id);
    `);
    console.log('✓ Created indexes');

    // Add products column to businesses table if it doesn't exist
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS products JSONB DEFAULT '[]'::jsonb;
    `);
    console.log('✓ Added products column to businesses table');

    // Add ecommerce_enabled column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS ecommerce_enabled BOOLEAN DEFAULT FALSE;
    `);
    console.log('✓ Added ecommerce_enabled column');

    // Add ab_test_enabled column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS ab_test_enabled BOOLEAN DEFAULT FALSE;
    `);
    console.log('✓ Added ab_test_enabled column');

    // Add current_variant column
    await pool.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS current_variant VARCHAR(100) DEFAULT 'default';
    `);
    console.log('✓ Added current_variant column');

    console.log('✅ E-commerce tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating e-commerce tables:', error);
    process.exit(1);
  }
}

createEcommerceTables();


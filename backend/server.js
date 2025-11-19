import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import businessRoutes from './routes/businessRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Server port configuration

// Initialize PostgreSQL database (non-blocking)
initializeDatabase()
  .then(() => {
    console.log('✅ Database initialized successfully');
  })
  .catch((error) => {
    console.error('❌ Database initialization error:', error.message);
    console.warn('⚠️  Server will continue running, but database features may not work');
    console.warn('⚠️  Please check your DATABASE_URL in .env file');
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Extract subdomain from hostname (for subdomain routing)
app.use((req, res, next) => {
  const hostname = req.hostname || req.headers.host || '';
  const parts = hostname.split('.');
  
  // Handle localhost subdomains: subdomain.localhost:PORT
  if (hostname.includes('localhost')) {
    const localhostParts = hostname.split(':')[0].split('.');
    if (localhostParts.length > 1 && localhostParts[1] === 'localhost') {
      req.subdomain = localhostParts[0];
    }
  } 
  // Handle production subdomains: subdomain.domain.com
  else if (parts.length > 2) {
    req.subdomain = parts[0];
  }
  
  next();
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const pool = (await import('./config/database.js')).default;
    await pool.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      message: 'VaranasiHub API is running',
      database: 'connected',
    });
  } catch (error) {
    res.json({ 
      status: 'OK', 
      message: 'VaranasiHub API is running',
      database: 'disconnected',
      error: process.env.NODE_ENV === 'development' ? {
        code: error.code,
        message: error.message,
      } : undefined,
    });
  }
});

// API Routes (must come before subdomain routing)
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/admin', adminRoutes);

// Subdomain routing handler (for business websites)
// This will be called when accessing: business-slug.varanasihub.com
app.use(async (req, res, next) => {
  const subdomain = req.subdomain;
  
  // If there's a subdomain and it's not 'www' or 'api', treat it as a business slug
  if (subdomain && subdomain !== 'www' && subdomain !== 'api' && !req.path.startsWith('/api')) {
    const { getBusinessBySubdomain } = await import('./controllers/businessController.js');
    return getBusinessBySubdomain(req, res, next);
  }
  
  next();
});

// Subdirectory routing is handled by businessRoutes.get('/:slug')
// For accessing: varanasihub.com/business-slug

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Database: PostgreSQL (Aiven)`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error(`   Please stop the process using port ${PORT} or change the PORT in .env`);
    console.error(`   To find and kill the process: Get-NetTCPConnection -LocalPort ${PORT} | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});


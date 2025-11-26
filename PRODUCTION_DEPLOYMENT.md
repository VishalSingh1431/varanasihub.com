# Production Deployment Guide

## Prerequisites

1. Node.js 18+ installed
2. PostgreSQL database (Aiven or self-hosted)
3. Cloudinary account for image storage
4. Domain name (optional, for subdomain routing)

## Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgres://username:password@host:port/database?sslmode=require

# JWT Secret (MUST be at least 32 characters)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.com
# or
CLIENT_URL=https://yourdomain.com

# Base Domain (for subdomain routing)
BASE_DOMAIN=yourdomain.com
```

### Frontend (.env)

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
# or if same domain:
VITE_API_BASE_URL=https://yourdomain.com/api
```

## Security Features Enabled

✅ **Helmet** - Security headers
✅ **Rate Limiting** - API protection
  - General API: 100 requests per 15 minutes
  - Auth routes: 10 requests per 15 minutes
  - File uploads: 20 requests per hour
✅ **CORS** - Configured for production domain
✅ **Compression** - Gzip compression enabled
✅ **Request Logging** - Morgan logging
✅ **Environment Validation** - Validates required variables

## Deployment Steps

### 1. Backend Deployment

```bash
cd backend

# Install dependencies
npm install --production

# Build (if needed)
# No build step required for Node.js backend

# Start server
npm start
```

**For PM2 (Process Manager):**

```bash
npm install -g pm2

# Start with PM2
pm2 start server.js --name varanasihub-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 2. Frontend Deployment

```bash
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Preview build (optional)
npm run preview
```

The `dist` folder contains the production build. Deploy this to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

### 3. Database Setup

1. Ensure PostgreSQL is running
2. Run migrations (if any):
   ```bash
   node scripts/add-premium-column.js
   ```
3. Verify connection in health check: `/api/health`

### 4. Reverse Proxy (Nginx Example)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 5. SSL Certificate

Use Let's Encrypt with Certbot:

```bash
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Health Check

Check server health:
```
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "message": "VaranasiHub API is running",
  "database": "connected"
}
```

## Monitoring

### PM2 Monitoring

```bash
# View logs
pm2 logs varanasihub-api

# Monitor
pm2 monit

# Status
pm2 status
```

### Log Files

- Production logs: Check PM2 logs or system logs
- Error logs: Check console output or log files

## Performance Optimization

1. **Database Connection Pooling**: Already configured (max 30 connections)
2. **Compression**: Enabled (Gzip)
3. **Caching**: Consider adding Redis for session storage
4. **CDN**: Use CloudFront/Cloudflare for static assets

## Security Checklist

- [x] Helmet security headers
- [x] Rate limiting enabled
- [x] CORS configured
- [x] JWT secret is strong (32+ characters)
- [x] Environment variables secured
- [x] HTTPS enabled
- [x] Database credentials secured
- [ ] Regular security updates
- [ ] Backup strategy implemented

## Backup Strategy

1. **Database Backups**: Set up automated PostgreSQL backups
2. **File Backups**: Cloudinary handles image backups
3. **Code Backups**: Use Git repository

## Troubleshooting

### Server won't start
- Check PORT is available
- Verify DATABASE_URL is correct
- Check JWT_SECRET is set

### Database connection fails
- Verify DATABASE_URL format
- Check database is running
- Verify network/firewall settings

### CORS errors
- Update FRONTEND_URL in .env
- Check CORS configuration in server.js

## Support

For issues, check:
1. Server logs
2. Database connection status
3. Environment variables
4. Health check endpoint



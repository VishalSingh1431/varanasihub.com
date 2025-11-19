// Quick script to verify all environment variables are set
import dotenv from 'dotenv';

dotenv.config();

const requiredVars = {
  'DATABASE_URL': 'Aiven PostgreSQL Service URI',
  'JWT_SECRET': 'JWT Secret Key',
  'GOOGLE_CLIENT_ID': 'Google OAuth Client ID',
  'EMAIL_USER': 'Email Username (Gmail)',
  'EMAIL_PASS': 'Email Password (Gmail App Password)',
  'CLOUDINARY_CLOUD_NAME': 'Cloudinary Cloud Name',
  'CLOUDINARY_API_KEY': 'Cloudinary API Key',
  'CLOUDINARY_API_SECRET': 'Cloudinary API Secret',
};

const optionalVars = {
  'BASE_DOMAIN': 'Base Domain (defaults to varanasihub.com)',
  'PORT': 'Server Port (defaults to 5000)',
};

console.log('\n🔍 Checking Environment Variables...\n');

let allSet = true;

// Check required variables
console.log('📋 Required Variables:');
for (const [key, description] of Object.entries(requiredVars)) {
  const value = process.env[key];
  if (value && value.trim() !== '') {
    // Mask sensitive values
    const displayValue = key.includes('PASSWORD') || key.includes('SECRET') || key.includes('KEY')
      ? '***' + value.slice(-4)
      : value.length > 50
      ? value.substring(0, 50) + '...'
      : value;
    console.log(`  ✅ ${key}: ${displayValue}`);
  } else {
    console.log(`  ❌ ${key}: MISSING - ${description}`);
    allSet = false;
  }
}

// Check optional variables
console.log('\n📋 Optional Variables:');
for (const [key, description] of Object.entries(optionalVars)) {
  const value = process.env[key];
  if (value && value.trim() !== '') {
    console.log(`  ✅ ${key}: ${value}`);
  } else {
    console.log(`  ⚠️  ${key}: Not set (will use default) - ${description}`);
  }
}

// Test DATABASE_URL format
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    console.log('\n🔗 Database URL Format:');
    console.log(`  ✅ Protocol: ${url.protocol}`);
    console.log(`  ✅ Host: ${url.hostname}`);
    console.log(`  ✅ Port: ${url.port || '5432'}`);
    console.log(`  ✅ Database: ${url.pathname.slice(1) || 'defaultdb'}`);
    console.log(`  ✅ User: ${url.username || 'Not specified'}`);
    console.log(`  ✅ SSL: ${url.searchParams.get('sslmode') || 'Not specified'}`);
  } catch (error) {
    console.log('\n❌ Database URL Format Error:', error.message);
    allSet = false;
  }
}

console.log('\n' + '='.repeat(50));
if (allSet) {
  console.log('✅ All required environment variables are set!');
  console.log('🚀 You can now start the server with: npm run dev');
} else {
  console.log('❌ Some required environment variables are missing!');
  console.log('📝 Please check your .env file and fill in all required values.');
}
console.log('='.repeat(50) + '\n');


// Comprehensive API Testing Script
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
};

async function testEndpoint(name, method, endpoint, body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (response.ok) {
      log.success(`${name}: ${response.status} ${response.statusText}`);
      return { success: true, data, status: response.status };
    } else {
      log.error(`${name}: ${response.status} - ${data.error || JSON.stringify(data)}`);
      return { success: false, data, status: response.status };
    }
  } catch (error) {
    log.error(`${name}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 VaranasiHub API Testing Suite');
  console.log('='.repeat(60) + '\n');

  // Test 1: Health Check
  log.info('Test 1: Health Check');
  const health = await testEndpoint('Health Check', 'GET', '/health');
  if (health.success && health.data.database === 'connected') {
    log.success('Database connection: CONNECTED');
  } else {
    log.warning('Database connection: DISCONNECTED (may still be initializing)');
  }
  console.log('');

  // Test 2: Send OTP
  log.info('Test 2: Send OTP');
  const testEmail = `test${Date.now()}@example.com`;
  const otpResult = await testEndpoint(
    'Send OTP',
    'POST',
    '/auth/send-otp',
    { email: testEmail }
  );
  console.log('');

  // Test 3: Verify OTP (will fail without valid OTP, but tests endpoint)
  log.info('Test 3: Verify OTP (Expected to fail - testing endpoint)');
  await testEndpoint(
    'Verify OTP',
    'POST',
    '/auth/verify-otp',
    { email: testEmail, otp: '0000', isSignup: true }
  );
  console.log('');

  // Test 4: Get All Businesses (should return empty array or businesses)
  log.info('Test 4: Get All Businesses');
  await testEndpoint('Get All Businesses', 'GET', '/business');
  console.log('');

  // Test 5: Get Business by Slug (should return 404 for non-existent)
  log.info('Test 5: Get Business by Slug (Non-existent)');
  await testEndpoint('Get Business by Slug', 'GET', '/business/test-slug-12345');
  console.log('');

  // Test 6: Create Business (will fail without files, but tests endpoint)
  log.info('Test 6: Create Business (Expected to fail - missing required fields/files)');
  await testEndpoint(
    'Create Business',
    'POST',
    '/business/create',
    {
      businessName: 'Test Business',
      category: 'Shop',
      mobileNumber: '1234567890',
      email: 'test@example.com',
      address: 'Test Address',
      description: 'Test description for business',
    }
  );
  console.log('');

  // Summary
  console.log('='.repeat(60));
  log.info('Testing Complete!');
  console.log('='.repeat(60));
  console.log('\n📝 Notes:');
  console.log('  - Some endpoints may show errors (this is expected for invalid data)');
  console.log('  - Database should show "connected" if PostgreSQL is working');
  console.log('  - OTP endpoint will work if email is configured');
  console.log('  - Business creation requires file uploads (test via frontend)');
  console.log('');
}

// Wait a bit for server to be ready, then run tests
setTimeout(() => {
  runTests().catch(console.error);
}, 2000);


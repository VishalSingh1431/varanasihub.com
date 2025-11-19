// Simple API Test Script
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api';

console.log('\n🧪 Testing VaranasiHub API...\n');

// Test 1: Health Check
console.log('1️⃣ Testing Health Endpoint...');
try {
  const response = await fetch(`${API_BASE}/health`);
  const data = await response.json();
  console.log('   Status:', response.status);
  console.log('   Response:', JSON.stringify(data, null, 2));
  if (data.database === 'connected') {
    console.log('   ✅ Database: CONNECTED');
  } else {
    console.log('   ⚠️  Database: DISCONNECTED (may still be initializing)');
  }
} catch (error) {
  console.log('   ❌ Error:', error.message);
}
console.log('');

// Test 2: Send OTP
console.log('2️⃣ Testing Send OTP Endpoint...');
const testEmail = `test${Date.now()}@example.com`;
try {
  const response = await fetch(`${API_BASE}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail }),
  });
  const data = await response.json();
  console.log('   Status:', response.status);
  console.log('   Response:', JSON.stringify(data, null, 2));
  if (response.ok) {
    console.log('   ✅ OTP sent successfully');
  } else {
    console.log('   ⚠️  OTP endpoint responded (may need email config)');
  }
} catch (error) {
  console.log('   ❌ Error:', error.message);
}
console.log('');

// Test 3: Get All Businesses
console.log('3️⃣ Testing Get All Businesses...');
try {
  const response = await fetch(`${API_BASE}/business`);
  const data = await response.json();
  console.log('   Status:', response.status);
  console.log('   Businesses found:', data.businesses?.length || 0);
  if (response.ok) {
    console.log('   ✅ Endpoint working');
  }
} catch (error) {
  console.log('   ❌ Error:', error.message);
}
console.log('');

// Test 4: Get Business by Slug (should return 404)
console.log('4️⃣ Testing Get Business by Slug (non-existent)...');
try {
  const response = await fetch(`${API_BASE}/business/test-slug-12345`);
  const data = await response.json();
  console.log('   Status:', response.status);
  if (response.status === 404) {
    console.log('   ✅ Correctly returns 404 for non-existent business');
  } else {
    console.log('   Response:', JSON.stringify(data, null, 2));
  }
} catch (error) {
  console.log('   ❌ Error:', error.message);
}
console.log('');

// Test 5: Create Business (will fail - missing files)
console.log('5️⃣ Testing Create Business (expected to fail - missing files)...');
try {
  const response = await fetch(`${API_BASE}/business/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessName: 'Test Business',
      category: 'Shop',
      mobileNumber: '1234567890',
      email: 'test@example.com',
      address: 'Test Address',
      description: 'Test description for business',
    }),
  });
  const data = await response.json();
  console.log('   Status:', response.status);
  console.log('   Response:', JSON.stringify(data, null, 2));
  if (response.status === 400) {
    console.log('   ✅ Correctly validates required fields');
  }
} catch (error) {
  console.log('   ❌ Error:', error.message);
}
console.log('');

console.log('✅ Testing Complete!\n');


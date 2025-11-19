import { API_BASE_URL } from './constants';

// API Configuration

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // If there's a help message, include it in the error
      const errorMessage = data.help 
        ? `${data.error}\n\n${data.help}`
        : data.error || 'Request failed';
      const error = new Error(errorMessage);
      error.help = data.help;
      error.code = data.code;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    // If it's a network error, provide helpful message
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      const networkError = new Error('Cannot connect to server. Make sure the backend server is running on port 5000.');
      networkError.help = 'Start the backend server with: cd backend && npm run dev';
      throw networkError;
    }
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  sendOTP: async (email) => {
    return apiCall('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  verifyOTP: async (email, otp, isSignup) => {
    return apiCall('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp, isSignup }),
    });
  },

  googleAuth: async (tokenId) => {
    return apiCall('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ tokenId }),
    });
  },

  verifyToken: async () => {
    return apiCall('/auth/verify', {
      method: 'GET',
    });
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me', {
      method: 'GET',
    });
  },

  updateProfile: async (profileData) => {
    return apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Business API functions
export const businessAPI = {
  getUserBusinesses: async () => {
    return apiCall('/business/my-businesses', {
      method: 'GET',
    });
  },

  getBusinessById: async (id) => {
    return apiCall(`/business/edit/${id}`, {
      method: 'GET',
    });
  },

  checkSubdomainAvailability: async (slug) => {
    return apiCall(`/business/check-subdomain?slug=${encodeURIComponent(slug)}`, {
      method: 'GET',
    });
  },

  getPendingApprovals: async () => {
    return apiCall('/admin/pending-approvals', {
      method: 'GET',
    });
  },

  getPendingEditApprovals: async () => {
    return apiCall('/admin/pending-edit-approvals', {
      method: 'GET',
    });
  },

  approveWebsite: async (id) => {
    return apiCall(`/admin/approve-website/${id}`, {
      method: 'POST',
    });
  },

  rejectWebsite: async (id, reason) => {
    return apiCall(`/admin/reject-website/${id}`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  approveEdit: async (id) => {
    return apiCall(`/admin/approve-edit/${id}`, {
      method: 'POST',
    });
  },

  rejectEdit: async (id, reason) => {
    return apiCall(`/admin/reject-edit/${id}`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  getAllUsers: async () => {
    return apiCall('/admin/users', {
      method: 'GET',
    });
  },

  updateUserRole: async (id, role) => {
    return apiCall(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },

  getAdminStats: async () => {
    return apiCall('/admin/stats', {
      method: 'GET',
    });
  },

  updateBusiness: async (id, formData) => {
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'services' || key === 'specialOffers' || key === 'businessHours' || key === 'appointmentSettings') {
        submitData.append(key, JSON.stringify(formData[key] || (key === 'businessHours' || key === 'appointmentSettings' ? {} : [])));
      } else if (key !== 'logo' && key !== 'images' && !key.startsWith('serviceImage_')) {
        submitData.append(key, formData[key] || '');
      }
    });

    // Add files
    if (formData.logo) {
      submitData.append('logo', formData.logo);
    }
    if (formData.images && Array.isArray(formData.images)) {
      formData.images.forEach((image) => {
        submitData.append('images', image);
      });
    }
    if (formData.services && Array.isArray(formData.services)) {
      formData.services.forEach((service, index) => {
        if (service.image) {
          submitData.append(`serviceImage_${index}`, service.image);
        }
      });
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/business/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: submitData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update business');
    }
    return data;
  },
};

export default API_BASE_URL;


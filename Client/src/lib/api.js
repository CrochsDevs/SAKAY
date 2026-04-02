// API configuration
const getApiUrl = () => {
  // In production (Docker), use relative URLs
  if (import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production') {
    return '';  // Empty string means use same origin
  }
  // In development, use localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};

const API_BASE_URL = getApiUrl();

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',  // Include cookies for session
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API call failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: (userData) => apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: (token) => apiCall('/api/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Feedback API calls (if you have them)
export const feedbackAPI = {
  getAll: () => apiCall('/api/feedbacks'),
  create: (data) => apiCall('/api/feedbacks', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default apiCall;

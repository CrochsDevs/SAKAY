import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // In production (when deployed to sakay.online), use relative URLs
  if (import.meta.env.PROD || window.location.hostname === 'sakay.online') {
    return '/api';  // This will use https://sakay.online/api
  }
  // In development, use localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { url, method } = error.config || {};
      
      const isPublicGetFeedback = url?.includes('/feedback') && method === 'get';
      
      // Only redirect for protected actions (POST, PUT, DELETE on feedback)
      const isProtectedAction = !isPublicGetFeedback;
      
      if (isProtectedAction && 
          !window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/signup')) {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Client/src/util/axios.js
import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // In production (when deployed to sakay.online), use relative URLs
  if (import.meta.env.PROD || window.location.hostname === 'sakay.online') {
    return '/api';  // This will use https://sakay.online/api
  }
  // In development, use localhost with /api
  return 'http://localhost:5000/api';  // ← ADD /api HERE
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
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`❌ ${error.response.status} ${error.config?.url}`, error.response.data);
    } else if (error.code === 'ERR_NETWORK') {
      console.error('❌ Network error - Cannot connect to server:', error.message);
    } else {
      console.error('❌ Error:', error.message);
    }
    
    if (error.response?.status === 401) {
      const { url, method } = error.config || {};
      
      const isPublicGetFeedback = url?.includes('/feedback') && method === 'get';
      const isPublicGetAnnouncements = url?.includes('/announcements') && method === 'get';
      const isPublicGetStatus = url?.includes('/auth/status') && method === 'get';
      
      const isPublicRoute = isPublicGetFeedback || isPublicGetAnnouncements || isPublicGetStatus;
      
      if (!isPublicRoute && 
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
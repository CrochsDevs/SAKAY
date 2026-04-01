import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true
});

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
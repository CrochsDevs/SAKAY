import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This is what shadcn/ui needs
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Your existing axios code
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (!window.location.pathname.includes('/login') && 
                !window.location.pathname.includes('/signup')) {
                sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
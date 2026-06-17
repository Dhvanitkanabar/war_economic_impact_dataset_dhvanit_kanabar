import axios from 'axios';
import { store } from '../app/store';
import { logout, setError } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

// Fallback to the production URL if the env variable is missing
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://war-economic-impact-dataset-dhvanit.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s — Render cold-start can be slow (free tier takes ~50s)
});

// ── Request interceptor: attach token ──────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: surface useful errors ────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log to console for easier debugging
    if (import.meta.env.DEV) {
      console.error(
        `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.response?.status,
        error.response?.data
      );
    }

    if (!error.response) {
      toast.error('Network error');
    } else {
      const status = error.response.status;
      const url = error.config?.url || '';

      if (status === 400) {
        if (url.includes('/login') || url.includes('/auth/login') || url.includes('/register') || url.includes('/auth/register')) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Server error');
        }
      } else if (status === 401) {
        if (url.includes('/login') || url.includes('/auth/login')) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Session expired');
        }
        localStorage.removeItem('token');
        store.dispatch(setError('Session expired. Please sign in again.'));
        store.dispatch(logout());
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } else if (status === 403) {
        toast.error('Forbidden request');
      } else if (status === 404) {
        if (url.includes('/conflicts')) {
          toast.error('Conflict not found');
        } else {
          toast.error('Server error');
        }
      } else if (status >= 500) {
        toast.error('Server error');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';
import { store } from '../app/store';
import { logout, setError } from '../features/auth/authSlice';
// Fallback to the production URL if the env variable is missing
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://war-economic-impact-dataset-dhvanit.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15s — Render cold-start can be slow
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

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      store.dispatch(setError('Session expired. Please sign in again.'));
      store.dispatch(logout());
      
      // Optionally redirect, but standard React patterns usually handle this 
      // via ProtectedRoute when isAuthenticated becomes false.
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

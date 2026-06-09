import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// Rehydrate auth state from localStorage on page refresh.
// If a token exists in localStorage, mark user as authenticated.
// This prevents the navbar from flashing "Sign in" after a hard refresh.
const token = localStorage.getItem('token');

const preloadedState = token
  ? {
      auth: {
        user: null,          // will be null until profile is fetched
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      },
    }
  : undefined;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

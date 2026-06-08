import axiosInstance from '../api/axiosInstance';

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/auth/profile');
  return response.data;
};

export const forgotPassword = async (email) => {
  const payload = typeof email === 'string' ? { email } : email;
  const response = await axiosInstance.post('/auth/forgot-password', payload);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post('/auth/reset-password', data);
  return response.data;
};

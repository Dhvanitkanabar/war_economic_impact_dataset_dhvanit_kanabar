import axiosInstance from '../api/axiosInstance';

// POST /auth/register
export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

// POST /auth/login
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

// GET /auth/profile  (requires token)
export const getProfile = async () => {
  const response = await axiosInstance.get('/auth/profile');
  return response.data;
};

// POST /auth/forgot-password
export const forgotPassword = async (email) => {
  const payload = typeof email === 'string' ? { email } : email;
  const response = await axiosInstance.post('/auth/forgot-password', payload);
  return response.data;
};

// POST /auth/reset-password
export const resetPassword = async (data) => {
  const response = await axiosInstance.post('/auth/reset-password', data);
  return response.data;
};

// POST /auth/refresh-token
export const refreshToken = async (token) => {
  const response = await axiosInstance.post('/auth/refresh-token', { token });
  return response.data;
};

// POST /auth/logout  (requires token)
export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

// DELETE /auth/delete-account  (requires token)
export const deleteAccount = async () => {
  const response = await axiosInstance.delete('/auth/delete-account');
  return response.data;
};

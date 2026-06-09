import axiosInstance from '../api/axiosInstance';

// GET /conflicts/search?keyword=<value>
export const searchConflicts = async (keyword) => {
  const response = await axiosInstance.get('/conflicts/search', {
    params: { keyword },
  });
  return response.data;
};

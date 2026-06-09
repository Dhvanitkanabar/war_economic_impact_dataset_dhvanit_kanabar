import axiosInstance from '../api/axiosInstance';

// GET /conflicts/stats/overview
export const getStatsOverview = async () => {
  const response = await axiosInstance.get('/conflicts/stats/overview');
  return response.data;
};

// GET /conflicts/stats/highest-inflation
export const getHighestInflation = async () => {
  const response = await axiosInstance.get('/conflicts/stats/highest-inflation');
  return response.data;
};

// GET /conflicts/stats/lowest-gdp
export const getLowestGDP = async () => {
  const response = await axiosInstance.get('/conflicts/stats/lowest-gdp');
  return response.data;
};

// GET /conflicts/stats/highest-war-cost
export const getHighestWarCost = async () => {
  const response = await axiosInstance.get('/conflicts/stats/highest-war-cost');
  return response.data;
};

// GET /conflicts/stats/highest-reconstruction-cost
export const getHighestReconstructionCost = async () => {
  const response = await axiosInstance.get('/conflicts/stats/highest-reconstruction-cost');
  return response.data;
};

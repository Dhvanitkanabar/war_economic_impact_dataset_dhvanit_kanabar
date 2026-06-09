import axiosInstance from '../api/axiosInstance';

// GET /conflicts/analytics/region-distribution
export const getRegionDistribution = async () => {
  const response = await axiosInstance.get('/conflicts/analytics/region-distribution');
  return response.data;
};

// GET /conflicts/analytics/type-distribution
export const getTypeDistribution = async () => {
  const response = await axiosInstance.get('/conflicts/analytics/type-distribution');
  return response.data;
};

// GET /conflicts/analytics/war-cost-by-region
export const getWarCostByRegion = async () => {
  const response = await axiosInstance.get('/conflicts/analytics/war-cost-by-region');
  return response.data;
};

// GET /conflicts/analytics/inflation-by-region
export const getInflationByRegion = async () => {
  const response = await axiosInstance.get('/conflicts/analytics/inflation-by-region');
  return response.data;
};

// GET /conflicts/analytics/sector-impact
export const getSectorImpact = async () => {
  const response = await axiosInstance.get('/conflicts/analytics/sector-impact');
  return response.data;
};

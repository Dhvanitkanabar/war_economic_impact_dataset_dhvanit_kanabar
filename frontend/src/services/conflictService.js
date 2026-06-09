import axiosInstance from '../api/axiosInstance';

/**
 * GET /conflicts
 *
 * Supported query params:
 *   page, limit, sort,
 *   region, status, conflictType, primaryCountry,
 *   mostAffectedSector, blackMarketActivityLevel, warProfiteeringDocumented,
 *   minInflation, maxInflation,
 *   minGDP, maxGDP,
 *   minWarCost, maxWarCost,
 *   minReconstructionCost, maxReconstructionCost,
 *   startYear, endYear
 */
export const getConflicts = async (params = {}) => {
  const response = await axiosInstance.get('/conflicts', { params });
  return response.data;
};

// GET /conflicts/:id
export const getConflictById = async (id) => {
  const response = await axiosInstance.get(`/conflicts/${id}`);
  return response.data;
};

// POST /conflicts  (Admin)
export const createConflict = async (data) => {
  const response = await axiosInstance.post('/conflicts', data);
  return response.data;
};

// PUT /conflicts/:id  (Admin — full replace)
export const replaceConflict = async (id, data) => {
  const response = await axiosInstance.put(`/conflicts/${id}`, data);
  return response.data;
};

// PATCH /conflicts/:id  (Admin — partial update)
export const updateConflict = async (id, data) => {
  const response = await axiosInstance.patch(`/conflicts/${id}`, data);
  return response.data;
};

// DELETE /conflicts/:id  (Admin)
export const deleteConflict = async (id) => {
  const response = await axiosInstance.delete(`/conflicts/${id}`);
  return response.data;
};

const express = require("express");
const {
  createConflict,
  getAllConflicts,
  getConflictById,
  replaceConflict,
  updateConflict,
  deleteConflict,
  searchConflicts,
  getConflictStatsOverview,
  getHighestInflationConflict,
  getLowestGDPConflict,
  getHighestWarCostConflict,
  getHighestReconstructionCostConflict,
  getRegionDistribution,
  getConflictTypeDistribution,
  getWarCostByRegion,
  getInflationByRegion,
  getSectorImpactAnalysis
} = require("../controllers/conflict.controller");

const router = express.Router();

// Define routes
router.get("/search", searchConflicts);
router.get("/stats/overview", getConflictStatsOverview);
router.get("/stats/highest-inflation", getHighestInflationConflict);
router.get("/stats/lowest-gdp", getLowestGDPConflict);
router.get("/stats/highest-war-cost", getHighestWarCostConflict);
router.get("/stats/highest-reconstruction-cost", getHighestReconstructionCostConflict);
router.get("/analytics/region-distribution", getRegionDistribution);
router.get("/analytics/type-distribution", getConflictTypeDistribution);
router.get("/analytics/war-cost-by-region", getWarCostByRegion);
router.get("/analytics/inflation-by-region", getInflationByRegion);
router.get("/analytics/sector-impact", getSectorImpactAnalysis);
router.get("/", getAllConflicts);
router.get("/:id", getConflictById);
router.post("/", createConflict);
router.put("/:id", replaceConflict);
router.patch("/:id", updateConflict);
router.delete("/:id", deleteConflict);

module.exports = router;




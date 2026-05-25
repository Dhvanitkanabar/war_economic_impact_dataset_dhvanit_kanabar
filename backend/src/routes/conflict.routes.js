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
  getHighestReconstructionCostConflict
} = require("../controllers/conflict.controller");

const router = express.Router();

// Define routes
router.get("/search", searchConflicts);
router.get("/stats/overview", getConflictStatsOverview);
router.get("/stats/highest-inflation", getHighestInflationConflict);
router.get("/stats/lowest-gdp", getLowestGDPConflict);
router.get("/stats/highest-war-cost", getHighestWarCostConflict);
router.get("/stats/highest-reconstruction-cost", getHighestReconstructionCostConflict);
router.get("/", getAllConflicts);
router.get("/:id", getConflictById);
router.post("/", createConflict);
router.put("/:id", replaceConflict);
router.patch("/:id", updateConflict);
router.delete("/:id", deleteConflict);

module.exports = router;




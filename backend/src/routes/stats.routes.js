const express = require("express");
const {
  getTotalConflicts,
  getOngoingConflicts,
  getResolvedConflicts,
  getHighestInflation,
  getLowestGdp,
  getHighestPoverty,
  getHighestFoodInsecurity,
  getHighestCurrencyGap,
  getHighestWarCost,
  getHighestReconstructionCost,
} = require("../controllers/stats.controller");

const router = express.Router();

// Define stats endpoints
router.get("/total-conflicts", getTotalConflicts);
router.get("/ongoing-conflicts", getOngoingConflicts);
router.get("/resolved-conflicts", getResolvedConflicts);
router.get("/highest-inflation", getHighestInflation);
router.get("/lowest-gdp", getLowestGdp);
router.get("/highest-poverty", getHighestPoverty);
router.get("/highest-food-insecurity", getHighestFoodInsecurity);
router.get("/highest-currency-gap", getHighestCurrencyGap);
router.get("/highest-war-cost", getHighestWarCost);
router.get("/highest-reconstruction-cost", getHighestReconstructionCost);

// HEAD & OPTIONS supporting stats endpoints
router.head("/total-conflicts", (req, res) => res.status(200).end());
router.options("/total-conflicts", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS, HEAD");
  return res.sendStatus(204);
});

module.exports = router;

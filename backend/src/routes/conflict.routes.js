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
  getSectorImpactAnalysis,
  getConflictsByName,
  getConflictsByType,
  getConflictsByRegion,
  getConflictsByStatus,
  getConflictsByCountry,
  getConflictsByStartYear,
  getConflictsByEndYear,
  getConflictsByInflationRate,
  getConflictsByGdpLoss,
  getConflictsByPovertyRate,
  getConflictsByExtremePoverty,
  getConflictsByFoodInsecurity,
  getConflictsByUnemployment,
  getConflictsByYouthUnemployment,
  getConflictsBySector,
  getConflictsByBlackMarketLevel,
  getConflictsByBlackMarketGoods,
  getConflictsByProfiteeringStatus,
  getConflictsByCurrencyGap,
  getConflictsByReconstructionCost,
  getConflictsByWarCost,
  getConflictsByInformalEconomyPre,
  getConflictsByInformalEconomyDuring,
  getConflictsByAffectedHouseholds,
  getLatestRegionalConflict,
  getOldestRegionalConflict,
  getCountryConflictHistory,
  countConflictsByType,
  countConflictsByStatus,
  getConflictsByYear,
  getSectorHighestGdpLoss,
  getSectorHighestInflation,
  getWarSummary,
  getWarEconomicImpact,
  getWarPovertyImpact,
  getWarBlackMarket,
  getWarReconstruction,
  getWarCurrencyCrisis,
  getWarUnemployment,
  getTopHighestInflationConflicts,
  getTopHighestPovertyConflicts,
  getRecentConflicts,
  getLatestConflicts,
  getRandomConflict,
  getTrendingConflicts,
  getHighRiskConflicts,
  getEconomicCollapseConflicts,
  getAiConflictSummary
} = require("../controllers/conflict.controller");

const { protect, adminOnly } = require("../middlewares/auth.middleware");
const { validateConflict } = require("../middlewares/validation.middleware");
const { generalLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

// Apply general rate limiting
router.use(generalLimiter);

// ── Static/Filter Endpoints ───────────────────────────────────────────────────
router.get("/top/highest-inflation", getTopHighestInflationConflicts);
router.get("/top/highest-poverty", getTopHighestPovertyConflicts);
router.get("/recent", getRecentConflicts);
router.get("/latest", getLatestConflicts);
router.get("/random", getRandomConflict);
router.get("/trending", getTrendingConflicts);
router.get("/high-risk", getHighRiskConflicts);
router.get("/economic-collapse", getEconomicCollapseConflicts);
router.get("/summary/ai", getAiConflictSummary);

// Static paginated lists helper injections
router.get("/ongoing", (req, res, next) => { req.query.status = "Ongoing"; next(); }, getAllConflicts);
router.get("/resolved", (req, res, next) => { req.query.status = "Resolved"; next(); }, getAllConflicts);
router.get("/europe", (req, res, next) => { req.query.region = "Europe"; next(); }, getAllConflicts);
router.get("/asia", (req, res, next) => { req.query.region = "East Asia"; next(); }, getAllConflicts);
router.get("/high-inflation", (req, res, next) => { req.query.minInflation = "50"; next(); }, getAllConflicts);
router.get("/high-poverty", (req, res, next) => { req.query.minPoverty = "25"; next(); }, getAllConflicts);
router.get("/high-gdp-loss", (req, res, next) => { req.query.maxGDP = "-30"; next(); }, getAllConflicts);
router.get("/black-market/high", (req, res, next) => { req.query.blackMarket = "High"; next(); }, getAllConflicts);

// ── Parametric Endpoints (GET /conflicts/...) ───────────────────────────
router.get("/name/:name", getConflictsByName);
router.get("/type/:type", getConflictsByType);
router.get("/region/:region", getConflictsByRegion);
router.get("/status/:status", getConflictsByStatus);
router.get("/country/:country", getConflictsByCountry);
router.get("/start-year/:year", getConflictsByStartYear);
router.get("/end-year/:year", getConflictsByEndYear);
router.get("/inflation/:rate", getConflictsByInflationRate);
router.get("/gdp-loss/:percentage", getConflictsByGdpLoss);
router.get("/poverty/:rate", getConflictsByPovertyRate);
router.get("/extreme-poverty/:rate", getConflictsByExtremePoverty);
router.get("/food-insecurity/:rate", getConflictsByFoodInsecurity);
router.get("/unemployment/:rate", getConflictsByUnemployment);
router.get("/youth-unemployment/:rate", getConflictsByYouthUnemployment);
router.get("/sector/:sector", getConflictsBySector);
router.get("/black-market/:level", getConflictsByBlackMarketLevel);
router.get("/black-market-goods/:goods", getConflictsByBlackMarketGoods);
router.get("/profiteering/:status", getConflictsByProfiteeringStatus);
router.get("/currency-gap/:gap", getConflictsByCurrencyGap);
router.get("/reconstruction-cost/:amount", getConflictsByReconstructionCost);
router.get("/cost-of-war/:amount", getConflictsByWarCost);
router.get("/informal-economy/pre/:value", getConflictsByInformalEconomyPre);
router.get("/informal-economy/during/:value", getConflictsByInformalEconomyDuring);
router.get("/households/:count", getConflictsByAffectedHouseholds);

// ── Projections & Aggregations ───────────────────────────────────────────────
router.get("/region/:region/latest", getLatestRegionalConflict);
router.get("/region/:region/oldest", getOldestRegionalConflict);
router.get("/country/:country/history", getCountryConflictHistory);
router.get("/type/:type/count", countConflictsByType);
router.get("/status/:status/count", countConflictsByStatus);
router.get("/year/:year", getConflictsByYear);
router.get("/sector/:sector/highest-gdp-loss", getSectorHighestGdpLoss);
router.get("/sector/:sector/highest-inflation", getSectorHighestInflation);

// War details projections
router.get("/war/:name/summary", getWarSummary);
router.get("/war/:name/economic-impact", getWarEconomicImpact);
router.get("/war/:name/poverty-impact", getWarPovertyImpact);
router.get("/war/:name/black-market", getWarBlackMarket);
router.get("/war/:name/reconstruction", getWarReconstruction);
router.get("/war/:name/currency-crisis", getWarCurrencyCrisis);
router.get("/war/:name/unemployment", getWarUnemployment);

// Legacy Analytics
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

// ── Standard CRUD (Mapped last so they do not block static routes) ───────────
router.get("/", getAllConflicts);
router.get("/:id", getConflictById);
router.post("/", protect, adminOnly, validateConflict, createConflict);
router.put("/:id", protect, adminOnly, validateConflict, replaceConflict);
router.patch("/:id", protect, adminOnly, updateConflict);
router.delete("/:id", protect, adminOnly, deleteConflict);

// HEAD & OPTIONS for conflicts collection
router.head("/", (req, res) => res.status(200).end());
router.head("/:id", (req, res) => res.status(200).end());
router.options("/", (req, res) => {
  res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
  return res.sendStatus(204);
});
router.options("/:id", (req, res) => {
  res.setHeader("Allow", "GET, PUT, PATCH, DELETE, OPTIONS, HEAD");
  return res.sendStatus(204);
});

module.exports = router;

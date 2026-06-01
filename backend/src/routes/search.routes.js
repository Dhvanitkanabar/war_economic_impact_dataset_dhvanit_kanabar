const express = require("express");
const {
  searchKeyword,
  searchConflictsCategorical,
  searchEconomic,
  searchSector,
  searchBlackMarket,
} = require("../controllers/search.controller");
const { searchLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

// Apply search rate limiter
router.use(searchLimiter);

// Define search endpoints
router.get("/", searchKeyword);
router.get("/conflicts", searchConflictsCategorical);
router.get("/economic", searchEconomic);
router.get("/sector", searchSector);
router.get("/black-market", searchBlackMarket);

// HEAD & OPTIONS supporting search endpoints
router.head("/", (req, res) => res.status(200).end());
router.options("/", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS, HEAD");
  return res.sendStatus(204);
});

module.exports = router;

const express = require("express");
const {
  getAllConflicts,
  createConflict,
  updateConflict,
  deleteConflict,
} = require("../controllers/conflict.controller");
const { getAdminDashboard } = require("../controllers/stats.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");
const { validateConflict } = require("../middlewares/validation.middleware");
const { adminLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

// Apply admin rate limiting and protections globally to this router
router.use(adminLimiter);
router.use(protect);
router.use(adminOnly);

// Admin dashboard
router.get("/dashboard", getAdminDashboard);

// Admin duplicate conflicts CRUD (as requested under Middleware Routes)
router.get("/conflicts", getAllConflicts);
router.post("/conflicts", validateConflict, createConflict);
router.patch("/conflicts/:id", updateConflict);
router.delete("/conflicts/:id", deleteConflict);

// HEAD & OPTIONS supporting admin endpoints
router.head("/dashboard", (req, res) => res.status(200).end());
router.options("/conflicts", (req, res) => {
  res.setHeader("Allow", "GET, POST, OPTIONS");
  return res.sendStatus(204);
});

module.exports = router;

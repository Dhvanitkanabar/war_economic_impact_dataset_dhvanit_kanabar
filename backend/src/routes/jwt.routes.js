const express = require("express");
const {
  generateToken,
  verifyToken,
  refreshToken,
  getJwtProfile,
  getJwtDashboard,
  getJwtAdmin,
  getJwtUser,
  logoutJwt,
} = require("../controllers/jwt.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public JWT endpoints
router.post("/generate-token", generateToken);
router.post("/verify-token", verifyToken);
router.post("/refresh-token", refreshToken);

// Protected JWT endpoints
router.get("/profile", protect, getJwtProfile);
router.get("/dashboard", protect, getJwtDashboard);
router.get("/admin", protect, adminOnly, getJwtAdmin);
router.get("/user", protect, getJwtUser);
router.delete("/logout", protect, logoutJwt);

// OPTIONS helper for communication capabilities
router.options("/profile", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS");
  return res.sendStatus(204);
});

module.exports = router;

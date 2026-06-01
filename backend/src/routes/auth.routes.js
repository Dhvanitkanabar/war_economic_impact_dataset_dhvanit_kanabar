const express = require("express");
const {
  registerUser,
  loginUser,
  getAuthProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  refreshAuthToken,
  deleteAccount
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authLimiter } = require("../middlewares/rateLimit.middleware");

const router = express.Router();

// Apply auth rate limiter for registration and login
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

// Other authentication endpoints
router.post("/logout", protect, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshAuthToken);
router.get("/me", protect, getAuthProfile);
router.get("/profile", protect, getAuthProfile); // Keep profile route supported as well
router.delete("/account", protect, deleteAccount);

// OPTIONS and HEAD helpers
router.head("/me", protect, (req, res) => res.status(200).end());
router.options("/login", (req, res) => {
  res.setHeader("Allow", "POST, OPTIONS");
  return res.sendStatus(204);
});

module.exports = router;

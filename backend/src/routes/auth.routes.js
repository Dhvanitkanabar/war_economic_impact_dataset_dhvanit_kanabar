const express = require("express");
const {
  registerUser,
  loginUser,
  getAuthProfile
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getAuthProfile);

module.exports = router;

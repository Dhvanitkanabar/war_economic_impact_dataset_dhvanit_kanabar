const express = require("express");
const {
  getAllConflicts,
  createConflict,
  deleteConflict,
} = require("../controllers/conflict.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Apply protection globally to this router
router.use(protect);

// User protected conflicts CRUD
router.get("/conflicts", getAllConflicts);
router.post("/conflicts", createConflict);
router.delete("/conflicts/:id", deleteConflict);

module.exports = router;

const express = require("express");
const {
  createConflict,
  getAllConflicts,
  getConflictById
} = require("../controllers/conflict.controller");

const router = express.Router();

// Define routes
router.get("/", getAllConflicts);
router.get("/:id", getConflictById);
router.post("/", createConflict);

module.exports = router;

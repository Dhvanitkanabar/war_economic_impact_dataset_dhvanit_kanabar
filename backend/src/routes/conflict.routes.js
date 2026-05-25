const express = require("express");
const {
  createConflict,
  getAllConflicts,
  getConflictById,
  replaceConflict,
  updateConflict,
  deleteConflict,
  searchConflicts
} = require("../controllers/conflict.controller");

const router = express.Router();

// Define routes
router.get("/search", searchConflicts);
router.get("/", getAllConflicts);
router.get("/:id", getConflictById);
router.post("/", createConflict);
router.put("/:id", replaceConflict);
router.patch("/:id", updateConflict);
router.delete("/:id", deleteConflict);

module.exports = router;



const express = require("express");
const {
  createRecord,
  replaceRecord,
  deleteRecord,
} = require("../controllers/record.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

// Helper middleware to inject entity params
const setEntity = (entityName) => {
  return (req, res, next) => {
    req.params.entity = entityName;
    next();
  };
};

// POST Routes (Admin Only)
router.post("/regions", protect, adminOnly, setEntity("regions"), createRecord);
router.post("/countries", protect, adminOnly, setEntity("countries"), createRecord);
router.post("/economic-records", protect, adminOnly, setEntity("economic-records"), createRecord);
router.post("/poverty-records", protect, adminOnly, setEntity("poverty-records"), createRecord);
router.post("/inflation-records", protect, adminOnly, setEntity("inflation-records"), createRecord);
router.post("/black-market-records", protect, adminOnly, setEntity("black-market-records"), createRecord);
router.post("/war-cost-records", protect, adminOnly, setEntity("war-cost-records"), createRecord);
router.post("/reconstruction-records", protect, adminOnly, setEntity("reconstruction-records"), createRecord);
router.post("/unemployment-records", protect, adminOnly, setEntity("unemployment-records"), createRecord);

// PUT Routes (Admin Only)
router.put("/countries/:id", protect, adminOnly, setEntity("countries"), replaceRecord);
router.put("/economic-records/:id", protect, adminOnly, setEntity("economic-records"), replaceRecord);
router.put("/reconstruction-records/:id", protect, adminOnly, setEntity("reconstruction-records"), replaceRecord);

// DELETE Routes (Admin Only)
router.delete("/regions/:id", protect, adminOnly, setEntity("regions"), deleteRecord);
router.delete("/countries/:id", protect, adminOnly, setEntity("countries"), deleteRecord);
router.delete("/economic-records/:id", protect, adminOnly, setEntity("economic-records"), deleteRecord);
router.delete("/poverty-records/:id", protect, adminOnly, setEntity("poverty-records"), deleteRecord);
router.delete("/black-market-records/:id", protect, adminOnly, setEntity("black-market-records"), deleteRecord);
router.delete("/war-cost-records/:id", protect, adminOnly, setEntity("war-cost-records"), deleteRecord);
router.delete("/reconstruction-records/:id", protect, adminOnly, setEntity("reconstruction-records"), deleteRecord);
router.delete("/inflation-records/:id", protect, adminOnly, setEntity("inflation-records"), deleteRecord);
router.delete("/unemployment-records/:id", protect, adminOnly, setEntity("unemployment-records"), deleteRecord);

module.exports = router;

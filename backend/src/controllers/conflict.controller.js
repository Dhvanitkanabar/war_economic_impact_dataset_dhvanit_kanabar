const Conflict = require("../models/conflict.model");

// API 1: CREATE CONFLICT
const createConflict = async (req, res) => {
  try {
    const conflict = await Conflict.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Conflict created successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create conflict",
      error: error.message
    });
  }
};

// API 2: GET ALL CONFLICTS
const getAllConflicts = async (req, res) => {
  try {
    const filter = {};

    // 1. Categorical Filters
    const simpleFilters = [
      "region",
      "status",
      "conflictType",
      "primaryCountry",
      "mostAffectedSector",
      "blackMarketActivityLevel"
    ];

    simpleFilters.forEach((field) => {
      if (req.query[field] !== undefined) {
        filter[field] = req.query[field];
      }
    });

    if (req.query.warProfiteeringDocumented !== undefined) {
      if (req.query.warProfiteeringDocumented === "true") {
        filter.warProfiteeringDocumented = true;
      } else if (req.query.warProfiteeringDocumented === "false") {
        filter.warProfiteeringDocumented = false;
      }
    }

    // 2. Numeric Range Filters
    // Inflation Rate
    if (req.query.minInflation !== undefined || req.query.maxInflation !== undefined) {
      filter.inflationRate = {};
      if (req.query.minInflation !== undefined) {
        const val = Number(req.query.minInflation);
        if (!isNaN(val)) filter.inflationRate.$gte = val;
      }
      if (req.query.maxInflation !== undefined) {
        const val = Number(req.query.maxInflation);
        if (!isNaN(val)) filter.inflationRate.$lte = val;
      }
      if (Object.keys(filter.inflationRate).length === 0) {
        delete filter.inflationRate;
      }
    }

    // GDP Change
    if (req.query.minGDP !== undefined || req.query.maxGDP !== undefined) {
      filter.gdpChange = {};
      if (req.query.minGDP !== undefined) {
        const val = Number(req.query.minGDP);
        if (!isNaN(val)) filter.gdpChange.$gte = val;
      }
      if (req.query.maxGDP !== undefined) {
        const val = Number(req.query.maxGDP);
        if (!isNaN(val)) filter.gdpChange.$lte = val;
      }
      if (Object.keys(filter.gdpChange).length === 0) {
        delete filter.gdpChange;
      }
    }

    // War Cost
    if (req.query.minWarCost !== undefined || req.query.maxWarCost !== undefined) {
      filter.warCostUsd = {};
      if (req.query.minWarCost !== undefined) {
        const val = Number(req.query.minWarCost);
        if (!isNaN(val)) filter.warCostUsd.$gte = val;
      }
      if (req.query.maxWarCost !== undefined) {
        const val = Number(req.query.maxWarCost);
        if (!isNaN(val)) filter.warCostUsd.$lte = val;
      }
      if (Object.keys(filter.warCostUsd).length === 0) {
        delete filter.warCostUsd;
      }
    }

    // Reconstruction Cost
    if (req.query.minReconstructionCost !== undefined || req.query.maxReconstructionCost !== undefined) {
      filter.reconstructionCostUsd = {};
      if (req.query.minReconstructionCost !== undefined) {
        const val = Number(req.query.minReconstructionCost);
        if (!isNaN(val)) filter.reconstructionCostUsd.$gte = val;
      }
      if (req.query.maxReconstructionCost !== undefined) {
        const val = Number(req.query.maxReconstructionCost);
        if (!isNaN(val)) filter.reconstructionCostUsd.$lte = val;
      }
      if (Object.keys(filter.reconstructionCostUsd).length === 0) {
        delete filter.reconstructionCostUsd;
      }
    }

    // Start Year
    if (req.query.startYear !== undefined) {
      const val = Number(req.query.startYear);
      if (!isNaN(val)) {
        filter.startYear = { $gte: val };
      }
    }

    // End Year
    if (req.query.endYear !== undefined) {
      const val = Number(req.query.endYear);
      if (!isNaN(val)) {
        filter.endYear = { $lte: val };
      }
    }

    // 3. Sorting
    const allowedSortFields = new Set([
      "conflictName",
      "conflictType",
      "region",
      "primaryCountry",
      "status",
      "startYear",
      "endYear",
      "inflationRate",
      "gdpChange",
      "warCostUsd",
      "reconstructionCostUsd",
      "povertyRate",
      "unemploymentSpike"
    ]);

    let sortBy = "-createdAt";
    if (req.query.sort) {
      const isDesc = req.query.sort.startsWith("-");
      const field = isDesc ? req.query.sort.substring(1) : req.query.sort;
      if (allowedSortFields.has(field)) {
        sortBy = req.query.sort;
      }
    }

    // 4. Pagination
    let page = Number(req.query.page);
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    let limit = Number(req.query.limit);
    if (isNaN(limit) || limit < 1) {
      limit = 10;
    }
    const skip = (page - 1) * limit;

    // 5. Query Execution
    const totalConflicts = await Conflict.countDocuments(filter);
    const conflicts = await Conflict.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalConflicts / limit);

    return res.status(200).json({
      success: true,
      message: "Conflicts fetched successfully",
      total: totalConflicts,
      page: page,
      limit: limit,
      totalPages: totalPages,
      count: conflicts.length,
      data: conflicts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conflicts",
      error: error.message
    });
  }
};

// API 3: GET CONFLICT BY ID
const getConflictById = async (req, res) => {
  try {
    const { id } = req.params;
    const conflict = await Conflict.findById(id);
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "Conflict not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Conflict fetched successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conflict",
      error: error.message
    });
  }
};

// API 4: REPLACE CONFLICT
const replaceConflict = async (req, res) => {
  try {
    const { id } = req.params;
    const conflict = await Conflict.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true
    });
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "Conflict not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Conflict replaced successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to replace conflict",
      error: error.message
    });
  }
};

// API 5: UPDATE CONFLICT
const updateConflict = async (req, res) => {
  try {
    const { id } = req.params;
    const conflict = await Conflict.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "Conflict not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Conflict updated successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update conflict",
      error: error.message
    });
  }
};

// API 6: DELETE CONFLICT
const deleteConflict = async (req, res) => {
  try {
    const { id } = req.params;
    const conflict = await Conflict.findByIdAndDelete(id);
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "Conflict not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Conflict deleted successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete conflict",
      error: error.message
    });
  }
};

module.exports = {
  createConflict,
  getAllConflicts,
  getConflictById,
  replaceConflict,
  updateConflict,
  deleteConflict
};


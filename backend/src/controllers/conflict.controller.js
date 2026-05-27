const Conflict = require("../models/conflict.model");
const asyncHandler = require("../utils/asyncHandler");

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

// API 7: SEARCH CONFLICTS
const searchConflicts = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required"
      });
    }

    const searchQuery = {
      $or: [
        { conflictName: { $regex: keyword, $options: "i" } },
        { conflictType: { $regex: keyword, $options: "i" } },
        { region: { $regex: keyword, $options: "i" } },
        { primaryCountry: { $regex: keyword, $options: "i" } },
        { mostAffectedSector: { $regex: keyword, $options: "i" } },
        { primaryBlackMarketGoods: { $regex: keyword, $options: "i" } },
        { blackMarketActivityLevel: { $regex: keyword, $options: "i" } },
        { status: { $regex: keyword, $options: "i" } }
      ]
    };

    const conflicts = await Conflict.find(searchQuery).sort("-createdAt");

    if (conflicts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No conflicts found for this keyword",
        keyword: keyword,
        total: 0,
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      keyword: keyword,
      total: conflicts.length,
      data: conflicts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to search conflicts",
      error: error.message
    });
  }
};

// API 8: STATS OVERVIEW
const getConflictStatsOverview = async (req, res) => {
  try {
    const stats = await Conflict.aggregate([
      {
        $group: {
          _id: null,
          totalConflicts: { $sum: 1 },
          ongoingConflicts: {
            $sum: { $cond: [{ $eq: ["$status", "Ongoing"] }, 1, 0] }
          },
          resolvedConflicts: {
            $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] }
          },
          totalWarCostUsd: { $sum: "$warCostUsd" },
          totalReconstructionCostUsd: { $sum: "$reconstructionCostUsd" },
          averageInflationRate: { $avg: "$inflationRate" },
          averageGDPChange: { $avg: "$gdpChange" },
          averageUnemploymentSpike: { $avg: "$unemploymentSpike" },
          averagePovertyRate: { $avg: "$duringWarPovertyRate" }
        }
      }
    ]);

    let data = {
      totalConflicts: 0,
      ongoingConflicts: 0,
      resolvedConflicts: 0,
      totalWarCostUsd: 0,
      totalReconstructionCostUsd: 0,
      averageInflationRate: 0,
      averageGDPChange: 0,
      averageUnemploymentSpike: 0,
      averagePovertyRate: 0
    };

    if (stats && stats.length > 0) {
      data = {
        totalConflicts: stats[0].totalConflicts || 0,
        ongoingConflicts: stats[0].ongoingConflicts || 0,
        resolvedConflicts: stats[0].resolvedConflicts || 0,
        totalWarCostUsd: stats[0].totalWarCostUsd || 0,
        totalReconstructionCostUsd: stats[0].totalReconstructionCostUsd || 0,
        averageInflationRate: stats[0].averageInflationRate || 0,
        averageGDPChange: stats[0].averageGDPChange || 0,
        averageUnemploymentSpike: stats[0].averageUnemploymentSpike || 0,
        averagePovertyRate: stats[0].averagePovertyRate || 0
      };
    }

    return res.status(200).json({
      success: true,
      message: "Conflict statistics overview fetched successfully",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conflict statistics overview",
      error: error.message
    });
  }
};

// API 9: HIGHEST INFLATION CONFLICT
const getHighestInflationConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ inflationRate: -1 });
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "No conflict data found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Highest inflation conflict fetched successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest inflation conflict",
      error: error.message
    });
  }
};

// API 10: LOWEST GDP CONFLICT
const getLowestGDPConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ gdpChange: 1 });
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "No conflict data found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lowest GDP conflict fetched successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch lowest GDP conflict",
      error: error.message
    });
  }
};

// API 11: HIGHEST WAR COST CONFLICT
const getHighestWarCostConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ warCostUsd: -1 });
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "No conflict data found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Highest war cost conflict fetched successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest war cost conflict",
      error: error.message
    });
  }
};

// API 12: HIGHEST RECONSTRUCTION COST CONFLICT
const getHighestReconstructionCostConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ reconstructionCostUsd: -1 });
    if (!conflict) {
      return res.status(404).json({
        success: false,
        message: "No conflict data found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Highest reconstruction cost conflict fetched successfully",
      data: conflict
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest reconstruction cost conflict",
      error: error.message
    });
  }
};

// API 13: REGION DISTRIBUTION
const getRegionDistribution = async (req, res) => {
  try {
    const result = await Conflict.aggregate([
      {
        $group: {
          _id: "$region",
          totalConflicts: { $sum: 1 }
        }
      },
      {
        $sort: { totalConflicts: -1 }
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          totalConflicts: 1
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No analytics data found",
        totalGroups: 0,
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Region distribution fetched successfully",
      totalGroups: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch region distribution",
      error: error.message
    });
  }
};

// API 14: CONFLICT TYPE DISTRIBUTION
const getConflictTypeDistribution = async (req, res) => {
  try {
    const result = await Conflict.aggregate([
      {
        $group: {
          _id: "$conflictType",
          totalConflicts: { $sum: 1 }
        }
      },
      {
        $sort: { totalConflicts: -1 }
      },
      {
        $project: {
          _id: 0,
          conflictType: "$_id",
          totalConflicts: 1
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No analytics data found",
        totalGroups: 0,
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conflict type distribution fetched successfully",
      totalGroups: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conflict type distribution",
      error: error.message
    });
  }
};

// API 15: WAR COST BY REGION
const getWarCostByRegion = async (req, res) => {
  try {
    const result = await Conflict.aggregate([
      {
        $group: {
          _id: "$region",
          totalWarCostUsd: { $sum: "$warCostUsd" },
          averageWarCostUsd: { $avg: "$warCostUsd" },
          totalConflicts: { $sum: 1 }
        }
      },
      {
        $sort: { totalWarCostUsd: -1 }
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          totalConflicts: 1,
          totalWarCostUsd: 1,
          averageWarCostUsd: { $round: ["$averageWarCostUsd", 2] }
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No analytics data found",
        totalGroups: 0,
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "War cost by region fetched successfully",
      totalGroups: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch war cost by region",
      error: error.message
    });
  }
};

// API 16: INFLATION BY REGION
const getInflationByRegion = async (req, res) => {
  try {
    const result = await Conflict.aggregate([
      {
        $group: {
          _id: "$region",
          averageInflationRate: { $avg: "$inflationRate" },
          highestInflationRate: { $max: "$inflationRate" },
          lowestInflationRate: { $min: "$inflationRate" },
          totalConflicts: { $sum: 1 }
        }
      },
      {
        $sort: { averageInflationRate: -1 }
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          totalConflicts: 1,
          averageInflationRate: { $round: ["$averageInflationRate", 2] },
          highestInflationRate: { $round: ["$highestInflationRate", 2] },
          lowestInflationRate: { $round: ["$lowestInflationRate", 2] }
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No analytics data found",
        totalGroups: 0,
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inflation by region fetched successfully",
      totalGroups: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inflation by region",
      error: error.message
    });
  }
};

// API 17: SECTOR IMPACT ANALYSIS
const getSectorImpactAnalysis = async (req, res) => {
  try {
    const result = await Conflict.aggregate([
      {
        $group: {
          _id: "$mostAffectedSector",
          totalConflicts: { $sum: 1 },
          averageGDPChange: { $avg: "$gdpChange" },
          averageInflationRate: { $avg: "$inflationRate" },
          averageUnemploymentSpike: { $avg: "$unemploymentSpike" },
          totalWarCostUsd: { $sum: "$warCostUsd" }
        }
      },
      {
        $sort: { totalConflicts: -1 }
      },
      {
        $project: {
          _id: 0,
          sector: "$_id",
          totalConflicts: 1,
          averageGDPChange: { $round: ["$averageGDPChange", 2] },
          averageInflationRate: { $round: ["$averageInflationRate", 2] },
          averageUnemploymentSpike: { $round: ["$averageUnemploymentSpike", 2] },
          totalWarCostUsd: 1
        }
      }
    ]);

    if (!result || result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No analytics data found",
        totalGroups: 0,
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sector impact analysis fetched successfully",
      totalGroups: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sector impact analysis",
      error: error.message
    });
  }
};

module.exports = {
  createConflict: asyncHandler(createConflict),
  getAllConflicts: asyncHandler(getAllConflicts),
  getConflictById: asyncHandler(getConflictById),
  replaceConflict: asyncHandler(replaceConflict),
  updateConflict: asyncHandler(updateConflict),
  deleteConflict: asyncHandler(deleteConflict),
  searchConflicts: asyncHandler(searchConflicts),
  getConflictStatsOverview: asyncHandler(getConflictStatsOverview),
  getHighestInflationConflict: asyncHandler(getHighestInflationConflict),
  getLowestGDPConflict: asyncHandler(getLowestGDPConflict),
  getHighestWarCostConflict: asyncHandler(getHighestWarCostConflict),
  getHighestReconstructionCostConflict: asyncHandler(getHighestReconstructionCostConflict),
  getRegionDistribution: asyncHandler(getRegionDistribution),
  getConflictTypeDistribution: asyncHandler(getConflictTypeDistribution),
  getWarCostByRegion: asyncHandler(getWarCostByRegion),
  getInflationByRegion: asyncHandler(getInflationByRegion),
  getSectorImpactAnalysis: asyncHandler(getSectorImpactAnalysis)
};




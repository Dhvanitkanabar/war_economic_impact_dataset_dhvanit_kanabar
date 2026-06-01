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

    // Support country and type aliases
    if (req.query.country !== undefined) {
      filter.primaryCountry = req.query.country;
    }
    if (req.query.type !== undefined) {
      filter.conflictType = req.query.type;
    }
    if (req.query.sector !== undefined) {
      filter.mostAffectedSector = req.query.sector;
    }
    if (req.query.blackMarket !== undefined) {
      filter.blackMarketActivityLevel = req.query.blackMarket;
    }

    if (req.query.warProfiteeringDocumented !== undefined) {
      if (req.query.warProfiteeringDocumented === "true" || req.query.warProfiteeringDocumented === "Yes") {
        filter.warProfiteeringDocumented = true;
      } else if (req.query.warProfiteeringDocumented === "false" || req.query.warProfiteeringDocumented === "No") {
        filter.warProfiteeringDocumented = false;
      }
    }
    if (req.query.profiteering !== undefined) {
      if (req.query.profiteering === "true" || req.query.profiteering === "Yes") {
        filter.warProfiteeringDocumented = true;
      } else if (req.query.profiteering === "false" || req.query.profiteering === "No") {
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

    // Inflation Above/Below
    if (req.query.inflationAbove !== undefined) {
      const val = Number(req.query.inflationAbove);
      if (!isNaN(val)) filter.inflationRate = { ...filter.inflationRate, $gte: val };
    }
    if (req.query.inflationBelow !== undefined) {
      const val = Number(req.query.inflationBelow);
      if (!isNaN(val)) filter.inflationRate = { ...filter.inflationRate, $lte: val };
    }

    // GDP Change / GDP Loss
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
    if (req.query.gdpLossAbove !== undefined) {
      const val = Number(req.query.gdpLossAbove);
      if (!isNaN(val)) filter.gdpChange = { ...filter.gdpChange, $lte: -val };
    }

    // Poverty
    if (req.query.minPoverty !== undefined || req.query.maxPoverty !== undefined) {
      filter.duringWarPovertyRate = {};
      if (req.query.minPoverty !== undefined) {
        const val = Number(req.query.minPoverty);
        if (!isNaN(val)) filter.duringWarPovertyRate.$gte = val;
      }
      if (req.query.maxPoverty !== undefined) {
        const val = Number(req.query.maxPoverty);
        if (!isNaN(val)) filter.duringWarPovertyRate.$lte = val;
      }
      if (Object.keys(filter.duringWarPovertyRate).length === 0) {
        delete filter.duringWarPovertyRate;
      }
    }
    if (req.query.povertyAbove !== undefined) {
      const val = Number(req.query.povertyAbove);
      if (!isNaN(val)) filter.duringWarPovertyRate = { ...filter.duringWarPovertyRate, $gte: val };
    }

    // Unemployment
    if (req.query.minUnemployment !== undefined || req.query.maxUnemployment !== undefined) {
      filter.duringWarUnemployment = {};
      if (req.query.minUnemployment !== undefined) {
        const val = Number(req.query.minUnemployment);
        if (!isNaN(val)) filter.duringWarUnemployment.$gte = val;
      }
      if (req.query.maxUnemployment !== undefined) {
        const val = Number(req.query.maxUnemployment);
        if (!isNaN(val)) filter.duringWarUnemployment.$lte = val;
      }
      if (Object.keys(filter.duringWarUnemployment).length === 0) {
        delete filter.duringWarUnemployment;
      }
    }

    // Food Insecurity
    if (req.query.foodInsecurityAbove !== undefined) {
      const val = Number(req.query.foodInsecurityAbove);
      if (!isNaN(val)) filter.foodInsecurityRate = { $gte: val };
    }

    // Currency Black Market Rate Gap
    if (req.query.currencyGapAbove !== undefined) {
      const val = Number(req.query.currencyGapAbove);
      if (!isNaN(val)) filter.currencyBlackMarketGap = { $gte: val };
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
    if (req.query.warCostAbove !== undefined) {
      const val = Number(req.query.warCostAbove);
      if (!isNaN(val)) filter.warCostUsd = { ...filter.warCostUsd, $gte: val };
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
    if (req.query.reconstructionAbove !== undefined) {
      const val = Number(req.query.reconstructionAbove);
      if (!isNaN(val)) filter.reconstructionCostUsd = { ...filter.reconstructionCostUsd, $gte: val };
    }

    // Timeline / Year Filters
    if (req.query.startYear !== undefined) {
      const val = Number(req.query.startYear);
      if (!isNaN(val)) {
        filter.startYear = { $gte: val };
      }
    }
    if (req.query.endYear !== undefined) {
      const val = Number(req.query.endYear);
      if (!isNaN(val)) {
        filter.endYear = { $lte: val };
      }
    }
    if (req.query.year !== undefined) {
      const val = Number(req.query.year);
      if (!isNaN(val)) {
        filter.startYear = { $lte: val };
        filter.endYear = { $gte: val };
      }
    }

    // Keyword Search
    if (req.query.keyword !== undefined && req.query.keyword.trim() !== "") {
      const keyword = req.query.keyword.trim();
      filter.$or = [
        { conflictName: { $regex: keyword, $options: "i" } },
        { primaryCountry: { $regex: keyword, $options: "i" } },
        { region: { $regex: keyword, $options: "i" } }
      ];
    }

    // 3. Sorting Map
    const sortFieldMap = {
      "Inflation_Rate_%": "inflationRate",
      "GDP_Change_%": "gdpChange",
      "Pre_War_Unemployment_%": "preWarUnemployment",
      "During_War_Unemployment_%": "duringWarUnemployment",
      "Food_Insecurity_Rate_%": "foodInsecurityRate",
      "Extreme_Poverty_Rate_%": "extremePovertyRate",
      "Currency_Devaluation_%": "currencyDevaluation",
      "Currency_Black_Market_Rate_Gap_%": "currencyBlackMarketGap",
      "Estimated_Reconstruction_Cost_USD": "reconstructionCostUsd",
      "Cost_of_War_USD": "warCostUsd",
      "Start_Year": "startYear",
      "End_Year": "endYear",
      "Conflict_Name": "conflictName"
    };

    let sortBy = "-createdAt";
    if (req.query.sort) {
      const isDesc = req.query.sort.startsWith("-");
      const rawField = isDesc ? req.query.sort.substring(1) : req.query.sort;
      const schemaField = sortFieldMap[rawField] || rawField;
      
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
        "duringWarPovertyRate",
        "extremePovertyRate",
        "preWarUnemployment",
        "duringWarUnemployment",
        "foodInsecurityRate",
        "currencyDevaluation",
        "currencyBlackMarketGap"
      ]);

      if (allowedSortFields.has(schemaField)) {
        sortBy = isDesc ? `-${schemaField}` : schemaField;
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


// GET /conflicts/name/:name
const getConflictsByName = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      conflictName: { $regex: req.params.name, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/type/:type
const getConflictsByType = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      conflictType: { $regex: req.params.type, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/region/:region
const getConflictsByRegion = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      region: { $regex: req.params.region, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/status/:status
const getConflictsByStatus = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      status: { $regex: req.params.status, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/country/:country
const getConflictsByCountry = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      primaryCountry: { $regex: req.params.country, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/start-year/:year
const getConflictsByStartYear = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ startYear: Number(req.params.year) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/end-year/:year
const getConflictsByEndYear = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ endYear: Number(req.params.year) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/inflation/:rate
const getConflictsByInflationRate = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ inflationRate: Number(req.params.rate) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/gdp-loss/:percentage
const getConflictsByGdpLoss = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ gdpChange: Number(req.params.percentage) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/poverty/:rate
const getConflictsByPovertyRate = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ duringWarPovertyRate: Number(req.params.rate) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/extreme-poverty/:rate
const getConflictsByExtremePoverty = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ extremePovertyRate: Number(req.params.rate) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/food-insecurity/:rate
const getConflictsByFoodInsecurity = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ foodInsecurityRate: Number(req.params.rate) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/unemployment/:rate
const getConflictsByUnemployment = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ duringWarUnemployment: Number(req.params.rate) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/youth-unemployment/:rate
const getConflictsByYouthUnemployment = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ youthUnemploymentChange: Number(req.params.rate) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/sector/:sector
const getConflictsBySector = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      mostAffectedSector: { $regex: req.params.sector, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/black-market/:level
const getConflictsByBlackMarketLevel = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      blackMarketActivityLevel: { $regex: req.params.level, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/black-market-goods/:goods
const getConflictsByBlackMarketGoods = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      primaryBlackMarketGoods: { $regex: req.params.goods, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/profiteering/:status
const getConflictsByProfiteeringStatus = async (req, res) => {
  try {
    const isProfiteering = req.params.status === "Yes" || req.params.status === "true";
    const conflicts = await Conflict.find({ warProfiteeringDocumented: isProfiteering });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/currency-gap/:gap
const getConflictsByCurrencyGap = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ currencyBlackMarketGap: Number(req.params.gap) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/reconstruction-cost/:amount
const getConflictsByReconstructionCost = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ reconstructionCostUsd: Number(req.params.amount) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/cost-of-war/:amount
const getConflictsByWarCost = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ warCostUsd: Number(req.params.amount) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/informal-economy/pre/:value
const getConflictsByInformalEconomyPre = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ informalEconomyPreWar: Number(req.params.value) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/informal-economy/during/:value
const getConflictsByInformalEconomyDuring = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ informalEconomyDuringWar: Number(req.params.value) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/households/:count
const getConflictsByAffectedHouseholds = async (req, res) => {
  try {
    const conflicts = await Conflict.find({ householdsFallenIntoPoverty: Number(req.params.count) });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/region/:region/latest
const getLatestRegionalConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      region: { $regex: req.params.region, $options: "i" },
    }).sort({ startYear: -1 });
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/region/:region/oldest
const getOldestRegionalConflict = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      region: { $regex: req.params.region, $options: "i" },
    }).sort({ startYear: 1 });
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/country/:country/history
const getCountryConflictHistory = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      primaryCountry: { $regex: req.params.country, $options: "i" },
    }).sort({ startYear: 1 });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/type/:type/count
const countConflictsByType = async (req, res) => {
  try {
    const count = await Conflict.countDocuments({
      conflictType: { $regex: req.params.type, $options: "i" },
    });
    return res.status(200).json({ success: true, count });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/status/:status/count
const countConflictsByStatus = async (req, res) => {
  try {
    const count = await Conflict.countDocuments({
      status: { $regex: req.params.status, $options: "i" },
    });
    return res.status(200).json({ success: true, count });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/year/:year
const getConflictsByYear = async (req, res) => {
  try {
    const year = Number(req.params.year);
    const conflicts = await Conflict.find({
      startYear: { $lte: year },
      endYear: { $gte: year },
    });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/sector/:sector/highest-gdp-loss
const getSectorHighestGdpLoss = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      mostAffectedSector: { $regex: req.params.sector, $options: "i" },
    }).sort({ gdpChange: 1 });
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/sector/:sector/highest-inflation
const getSectorHighestInflation = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      mostAffectedSector: { $regex: req.params.sector, $options: "i" },
    }).sort({ inflationRate: -1 });
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/summary
const getWarSummary = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    });
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/economic-impact
const getWarEconomicImpact = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    }).select("conflictName primaryCountry gdpChange inflationRate currencyDevaluation warCostUsd reconstructionCostUsd");
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/poverty-impact
const getWarPovertyImpact = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    }).select("conflictName primaryCountry preWarPovertyRate duringWarPovertyRate extremePovertyRate foodInsecurityRate householdsFallenIntoPoverty");
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/black-market
const getWarBlackMarket = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    }).select("conflictName primaryCountry informalEconomyPreWar informalEconomyDuringWar blackMarketActivityLevel primaryBlackMarketGoods currencyBlackMarketGap warProfiteeringDocumented");
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/reconstruction
const getWarReconstruction = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    }).select("conflictName primaryCountry reconstructionCostUsd status endYear");
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/currency-crisis
const getWarCurrencyCrisis = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    }).select("conflictName primaryCountry currencyDevaluation currencyBlackMarketGap");
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/war/:name/unemployment
const getWarUnemployment = async (req, res) => {
  try {
    const conflict = await Conflict.findOne({
      conflictName: { $regex: req.params.name, $options: "i" },
    }).select("conflictName primaryCountry preWarUnemployment duringWarUnemployment unemploymentSpike youthUnemploymentChange mostAffectedSector");
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/top/highest-inflation
const getTopHighestInflationConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find().sort({ inflationRate: -1 }).limit(10);
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/top/highest-poverty
const getTopHighestPovertyConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find().sort({ duringWarPovertyRate: -1 }).limit(10);
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/recent
const getRecentConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find().sort({ startYear: -1 }).limit(5);
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/latest
const getLatestConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find().sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/random
const getRandomConflict = async (req, res) => {
  try {
    const count = await Conflict.countDocuments();
    if (count === 0) return res.status(200).json({ success: true, data: null });
    const randomIdx = Math.floor(Math.random() * count);
    const conflict = await Conflict.findOne().skip(randomIdx);
    return res.status(200).json({ success: true, data: conflict });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/trending
const getTrendingConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find().sort({ inflationRate: -1, gdpChange: 1 }).limit(5);
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/high-risk
const getHighRiskConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      $or: [
        { inflationRate: { $gte: 50 } },
        { gdpChange: { $lte: -30 } },
        { blackMarketActivityLevel: { $in: ["High", "Dominant"] } }
      ]
    }).sort({ inflationRate: -1 });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /conflicts/economic-collapse
const getEconomicCollapseConflicts = async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      $or: [
        { gdpChange: { $lte: -40 } },
        { inflationRate: { $gte: 100 } }
      ]
    }).sort({ gdpChange: 1 });
    return res.status(200).json({ success: true, data: conflicts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /compare?conflict1=...&conflict2=...
const compareConflicts = async (req, res) => {
  try {
    const { conflict1, conflict2 } = req.query;
    if (!conflict1 || !conflict2) {
      return res.status(400).json({
        success: false,
        message: "Two query parameters conflict1 and conflict2 are required for comparison",
      });
    }

    const c1 = await Conflict.findOne({ conflictName: { $regex: conflict1, $options: "i" } });
    const c2 = await Conflict.findOne({ conflictName: { $regex: conflict2, $options: "i" } });

    if (!c1 || !c2) {
      return res.status(404).json({
        success: false,
        message: "One or both conflicts to compare were not found",
        conflict1Found: !!c1,
        conflict2Found: !!c2,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conflicts compared successfully",
      comparison: {
        conflict1: c1,
        conflict2: c2
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to compare conflicts",
      error: error.message,
    });
  }
};

// GET /conflicts/summary/ai
const getAiConflictSummary = async (req, res) => {
  try {
    const count = await Conflict.countDocuments();
    const stats = await Conflict.aggregate([
      {
        $group: {
          _id: null,
          avgInflation: { $avg: "$inflationRate" },
          avgGDPChange: { $avg: "$gdpChange" },
          avgWarCost: { $avg: "$warCostUsd" }
        }
      }
    ]);

    const info = stats && stats.length > 0 ? stats[0] : { avgInflation: 0, avgGDPChange: 0, avgWarCost: 0 };

    const aiSummary = `Global conflict economic analysis reveals a dataset of ${count} recorded warfare impacts. On average, conflicts result in a GDP contraction of ${Number(info.avgGDPChange).toFixed(2)}%, a severe inflation rate increase of ${Number(info.avgInflation).toFixed(2)}%, and a direct cost of war averaging $${(Number(info.avgWarCost) / 1e9).toFixed(2)}B USD. Modern asymmetric conflicts present high informal economy sizes and dominant black market activities, necessitating robust policy actions and substantial reconstruction initiatives.`;

    return res.status(200).json({
      success: true,
      message: "AI conflict summary generated successfully",
      summary: aiSummary
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate AI conflict summary",
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
  getSectorImpactAnalysis: asyncHandler(getSectorImpactAnalysis),
  getConflictsByName: asyncHandler(getConflictsByName),
  getConflictsByType: asyncHandler(getConflictsByType),
  getConflictsByRegion: asyncHandler(getConflictsByRegion),
  getConflictsByStatus: asyncHandler(getConflictsByStatus),
  getConflictsByCountry: asyncHandler(getConflictsByCountry),
  getConflictsByStartYear: asyncHandler(getConflictsByStartYear),
  getConflictsByEndYear: asyncHandler(getConflictsByEndYear),
  getConflictsByInflationRate: asyncHandler(getConflictsByInflationRate),
  getConflictsByGdpLoss: asyncHandler(getConflictsByGdpLoss),
  getConflictsByPovertyRate: asyncHandler(getConflictsByPovertyRate),
  getConflictsByExtremePoverty: asyncHandler(getConflictsByExtremePoverty),
  getConflictsByFoodInsecurity: asyncHandler(getConflictsByFoodInsecurity),
  getConflictsByUnemployment: asyncHandler(getConflictsByUnemployment),
  getConflictsByYouthUnemployment: asyncHandler(getConflictsByYouthUnemployment),
  getConflictsBySector: asyncHandler(getConflictsBySector),
  getConflictsByBlackMarketLevel: asyncHandler(getConflictsByBlackMarketLevel),
  getConflictsByBlackMarketGoods: asyncHandler(getConflictsByBlackMarketGoods),
  getConflictsByProfiteeringStatus: asyncHandler(getConflictsByProfiteeringStatus),
  getConflictsByCurrencyGap: asyncHandler(getConflictsByCurrencyGap),
  getConflictsByReconstructionCost: asyncHandler(getConflictsByReconstructionCost),
  getConflictsByWarCost: asyncHandler(getConflictsByWarCost),
  getConflictsByInformalEconomyPre: asyncHandler(getConflictsByInformalEconomyPre),
  getConflictsByInformalEconomyDuring: asyncHandler(getConflictsByInformalEconomyDuring),
  getConflictsByAffectedHouseholds: asyncHandler(getConflictsByAffectedHouseholds),
  getLatestRegionalConflict: asyncHandler(getLatestRegionalConflict),
  getOldestRegionalConflict: asyncHandler(getOldestRegionalConflict),
  getCountryConflictHistory: asyncHandler(getCountryConflictHistory),
  countConflictsByType: asyncHandler(countConflictsByType),
  countConflictsByStatus: asyncHandler(countConflictsByStatus),
  getConflictsByYear: asyncHandler(getConflictsByYear),
  getSectorHighestGdpLoss: asyncHandler(getSectorHighestGdpLoss),
  getSectorHighestInflation: asyncHandler(getSectorHighestInflation),
  getWarSummary: asyncHandler(getWarSummary),
  getWarEconomicImpact: asyncHandler(getWarEconomicImpact),
  getWarPovertyImpact: asyncHandler(getWarPovertyImpact),
  getWarBlackMarket: asyncHandler(getWarBlackMarket),
  getWarReconstruction: asyncHandler(getWarReconstruction),
  getWarCurrencyCrisis: asyncHandler(getWarCurrencyCrisis),
  getWarUnemployment: asyncHandler(getWarUnemployment),
  getTopHighestInflationConflicts: asyncHandler(getTopHighestInflationConflicts),
  getTopHighestPovertyConflicts: asyncHandler(getTopHighestPovertyConflicts),
  getRecentConflicts: asyncHandler(getRecentConflicts),
  getLatestConflicts: asyncHandler(getLatestConflicts),
  getRandomConflict: asyncHandler(getRandomConflict),
  getTrendingConflicts: asyncHandler(getTrendingConflicts),
  getHighRiskConflicts: asyncHandler(getHighRiskConflicts),
  getEconomicCollapseConflicts: asyncHandler(getEconomicCollapseConflicts),
  compareConflicts: asyncHandler(compareConflicts),
  getAiConflictSummary: asyncHandler(getAiConflictSummary)
};




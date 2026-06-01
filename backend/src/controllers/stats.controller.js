const Conflict = require("../models/conflict.model");
const User = require("../models/user.model");


// GET /stats/total-conflicts
const getTotalConflicts = async (req, res) => {
  try {
    const count = await Conflict.countDocuments();
    return res.status(200).json({
      success: true,
      message: "Total conflicts count fetched successfully",
      totalConflicts: count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total conflicts count",
      error: error.message,
    });
  }
};

// GET /stats/ongoing-conflicts
const getOngoingConflicts = async (req, res) => {
  try {
    const count = await Conflict.countDocuments({ status: "Ongoing" });
    return res.status(200).json({
      success: true,
      message: "Total ongoing conflicts count fetched successfully",
      ongoingConflicts: count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing conflicts count",
      error: error.message,
    });
  }
};

// GET /stats/resolved-conflicts
const getResolvedConflicts = async (req, res) => {
  try {
    const count = await Conflict.countDocuments({ status: "Resolved" });
    return res.status(200).json({
      success: true,
      message: "Total resolved conflicts count fetched successfully",
      resolvedConflicts: count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resolved conflicts count",
      error: error.message,
    });
  }
};

// GET /stats/highest-inflation
const getHighestInflation = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ inflationRate: -1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with highest inflation rate fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest inflation conflict",
      error: error.message,
    });
  }
};

// GET /stats/lowest-gdp
const getLowestGdp = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ gdpChange: 1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with lowest GDP change fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch lowest GDP conflict",
      error: error.message,
    });
  }
};

// GET /stats/highest-poverty
const getHighestPoverty = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ duringWarPovertyRate: -1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with highest poverty rate fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest poverty conflict",
      error: error.message,
    });
  }
};

// GET /stats/highest-food-insecurity
const getHighestFoodInsecurity = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ foodInsecurityRate: -1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with highest food insecurity rate fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest food insecurity conflict",
      error: error.message,
    });
  }
};

// GET /stats/highest-currency-gap
const getHighestCurrencyGap = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ currencyBlackMarketGap: -1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with highest currency black market gap fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest currency gap conflict",
      error: error.message,
    });
  }
};

// GET /stats/highest-war-cost
const getHighestWarCost = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ warCostUsd: -1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with highest cost of war fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest war cost conflict",
      error: error.message,
    });
  }
};

// GET /stats/highest-reconstruction-cost
const getHighestReconstructionCost = async (req, res) => {
  try {
    const conflict = await Conflict.findOne().sort({ reconstructionCostUsd: -1 });
    return res.status(200).json({
      success: true,
      message: "Conflict with highest reconstruction cost fetched successfully",
      data: conflict,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch highest reconstruction cost conflict",
      error: error.message,
    });
  }
};


// GET /admin/dashboard
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const standardUsers = await User.countDocuments({ role: "user" });
    const totalConflicts = await Conflict.countDocuments();
    const ongoingConflicts = await Conflict.countDocuments({ status: "Ongoing" });
    const resolvedConflicts = await Conflict.countDocuments({ status: "Resolved" });

    // Aggregate average values
    const averages = await Conflict.aggregate([
      {
        $group: {
          _id: null,
          avgInflation: { $avg: "$inflationRate" },
          avgGDPChange: { $avg: "$gdpChange" },
          avgWarCost: { $avg: "$warCostUsd" },
          avgReconstruction: { $avg: "$reconstructionCostUsd" }
        }
      }
    ]);

    const stats = averages && averages.length > 0 ? averages[0] : {
      avgInflation: 0,
      avgGDPChange: 0,
      avgWarCost: 0,
      avgReconstruction: 0
    };

    return res.status(200).json({
      success: true,
      message: "Admin dashboard stats retrieved successfully",
      data: {
        users: {
          total: totalUsers,
          admins: adminUsers,
          standards: standardUsers
        },
        conflicts: {
          total: totalConflicts,
          ongoing: ongoingConflicts,
          resolved: resolvedConflicts
        },
        macroeconomics: {
          averageInflation: stats.avgInflation || 0,
          averageGDPChange: stats.avgGDPChange || 0,
          averageWarCostUsd: stats.avgWarCost || 0,
          averageReconstructionCostUsd: stats.avgReconstruction || 0
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard statistics",
      error: error.message
    });
  }
};

module.exports = {
  getTotalConflicts,
  getOngoingConflicts,
  getResolvedConflicts,
  getHighestInflation,
  getLowestGdp,
  getHighestPoverty,
  getHighestFoodInsecurity,
  getHighestCurrencyGap,
  getHighestWarCost,
  getHighestReconstructionCost,
  getAdminDashboard
};


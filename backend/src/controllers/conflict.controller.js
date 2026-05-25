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
    const conflicts = await Conflict.find({});
    return res.status(200).json({
      success: true,
      message: "Conflicts fetched successfully",
      total: conflicts.length,
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


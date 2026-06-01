const Region = require("../models/region.model");
const Country = require("../models/country.model");
const EconomicRecord = require("../models/economicRecord.model");
const PovertyRecord = require("../models/povertyRecord.model");
const InflationRecord = require("../models/inflationRecord.model");
const BlackMarketRecord = require("../models/blackMarketRecord.model");
const WarCostRecord = require("../models/warCostRecord.model");
const ReconstructionRecord = require("../models/reconstructionRecord.model");
const UnemploymentRecord = require("../models/unemploymentRecord.model");

const modelsMap = {
  regions: Region,
  countries: Country,
  "economic-records": EconomicRecord,
  "poverty-records": PovertyRecord,
  "inflation-records": InflationRecord,
  "black-market-records": BlackMarketRecord,
  "war-cost-records": WarCostRecord,
  "reconstruction-records": ReconstructionRecord,
  "unemployment-records": UnemploymentRecord,
};

const getModel = (entity) => {
  const model = modelsMap[entity];
  if (!model) {
    throw new Error(`Invalid entity type: ${entity}`);
  }
  return model;
};

// Generic Create
const createRecord = async (req, res) => {
  try {
    const { entity } = req.params;
    const Model = getModel(entity);
    const doc = await Model.create(req.body);

    return res.status(201).json({
      success: true,
      message: `${entity.substring(0, entity.length - 1)} record created successfully`,
      data: doc,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Failed to create record for ${req.params.entity}`,
      error: error.message,
    });
  }
};

// Generic Replace (PUT)
const replaceRecord = async (req, res) => {
  try {
    const { entity, id } = req.params;
    const Model = getModel(entity);

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: `${entity.substring(0, entity.length - 1)} record not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${entity.substring(0, entity.length - 1)} record replaced successfully`,
      data: doc,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Failed to replace record for ${req.params.entity}`,
      error: error.message,
    });
  }
};

// Generic Delete
const deleteRecord = async (req, res) => {
  try {
    const { entity, id } = req.params;
    const Model = getModel(entity);

    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: `${entity.substring(0, entity.length - 1)} record not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${entity.substring(0, entity.length - 1)} record deleted successfully`,
      data: doc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete record for ${req.params.entity}`,
      error: error.message,
    });
  }
};

module.exports = {
  createRecord,
  replaceRecord,
  deleteRecord,
};

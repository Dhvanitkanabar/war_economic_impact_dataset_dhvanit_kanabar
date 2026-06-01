const mongoose = require("mongoose");

const economicRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    gdpChange: {
      type: Number,
    },
    inflationRate: {
      type: Number,
    },
    currencyDevaluation: {
      type: Number,
    },
    warCostUsd: {
      type: Number,
    },
    reconstructionCostUsd: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EconomicRecord", economicRecordSchema);

const mongoose = require("mongoose");

const reconstructionRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    reconstructionCostUsd: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReconstructionRecord", reconstructionRecordSchema);

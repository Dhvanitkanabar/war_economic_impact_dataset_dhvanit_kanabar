const mongoose = require("mongoose");

const warCostRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    warCostUsd: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WarCostRecord", warCostRecordSchema);

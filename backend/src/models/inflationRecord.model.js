const mongoose = require("mongoose");

const inflationRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    inflationRate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InflationRecord", inflationRecordSchema);

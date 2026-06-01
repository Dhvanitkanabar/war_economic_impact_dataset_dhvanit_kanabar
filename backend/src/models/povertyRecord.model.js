const mongoose = require("mongoose");

const povertyRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    preWarPovertyRate: {
      type: Number,
    },
    duringWarPovertyRate: {
      type: Number,
    },
    extremePovertyRate: {
      type: Number,
    },
    foodInsecurityRate: {
      type: Number,
    },
    householdsFallenIntoPoverty: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PovertyRecord", povertyRecordSchema);

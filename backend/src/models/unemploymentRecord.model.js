const mongoose = require("mongoose");

const unemploymentRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    preWarUnemployment: {
      type: Number,
    },
    duringWarUnemployment: {
      type: Number,
    },
    unemploymentSpike: {
      type: Number,
    },
    mostAffectedSector: {
      type: String,
    },
    youthUnemploymentChange: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UnemploymentRecord", unemploymentRecordSchema);

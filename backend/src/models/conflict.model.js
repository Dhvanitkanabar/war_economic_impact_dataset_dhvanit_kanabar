const mongoose = require("mongoose");

const conflictSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────────────────────
    conflictName: {
      type: String,
      required: true,
      trim: true,
    },
    conflictType: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "World War",
        "Civil War",
        "Interstate War",
        "Asymmetric War",
        "Interstate/Counter-insurgency",
      ],
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    startYear: {
      type: Number,
      required: true,
      min: 0,
    },
    endYear: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["Ongoing", "Resolved"],
    },
    primaryCountry: {
      type: String,
      required: true,
      trim: true,
    },

    // ── Unemployment ──────────────────────────────────────────────────────────
    preWarUnemployment: {
      type: Number,
      min: 0,
    },
    duringWarUnemployment: {
      type: Number,
      min: 0,
    },
    unemploymentSpike: {
      type: Number,
      min: 0,
    },
    mostAffectedSector: {
      type: String,
    },
    youthUnemploymentChange: {
      type: Number,
      min: 0,
    },

    // ── Poverty ───────────────────────────────────────────────────────────────
    preWarPovertyRate: {
      type: Number,
      min: 0,
    },
    duringWarPovertyRate: {
      type: Number,
      min: 0,
    },
    extremePovertyRate: {
      type: Number,
      min: 0,
    },
    foodInsecurityRate: {
      type: Number,
      min: 0,
    },
    householdsFallenIntoPoverty: {
      type: Number,
      min: 0,
    },

    // ── Macroeconomics ────────────────────────────────────────────────────────
    gdpChange: {
      type: Number,
      required: true,
      // No min: 0 — GDP change can be negative
    },
    inflationRate: {
      type: Number,
      required: true,
      min: 0,
    },
    currencyDevaluation: {
      type: Number,
      min: 0,
    },
    warCostUsd: {
      type: Number,
      required: true,
      min: 0,
    },
    reconstructionCostUsd: {
      type: Number,
      required: true,
      min: 0,
    },

    // ── Informal Economy ──────────────────────────────────────────────────────
    informalEconomyPreWar: {
      type: Number,
      min: 0,
    },
    informalEconomyDuringWar: {
      type: Number,
      min: 0,
    },
    blackMarketActivityLevel: {
      type: String,
      enum: ["Low", "Moderate", "High", "Dominant"],
    },
    primaryBlackMarketGoods: {
      type: String,
    },
    currencyBlackMarketGap: {
      type: Number,
      min: 0,
    },
    warProfiteeringDocumented: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────

// Single-field indexes for frequently queried fields
conflictSchema.index({ conflictName: 1 });
conflictSchema.index({ region: 1 });
conflictSchema.index({ primaryCountry: 1 });
conflictSchema.index({ status: 1 });
conflictSchema.index({ conflictType: 1 });
conflictSchema.index({ inflationRate: 1 });
conflictSchema.index({ gdpChange: 1 });
conflictSchema.index({ warCostUsd: 1 });

// Text index for full-text search across key descriptive fields
conflictSchema.index(
  {
    conflictName: "text",
    conflictType: "text",
    region: "text",
    primaryCountry: "text",
    mostAffectedSector: "text",
    primaryBlackMarketGoods: "text",
  },
  { name: "conflict_text_search" }
);

// ── Export ────────────────────────────────────────────────────────────────────

module.exports = mongoose.model("Conflict", conflictSchema);

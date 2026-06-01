const mongoose = require("mongoose");

const blackMarketRecordSchema = new mongoose.Schema(
  {
    conflictId: {
      type: String,
      required: true,
      trim: true,
    },
    informalEconomyPreWar: {
      type: Number,
    },
    informalEconomyDuringWar: {
      type: Number,
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
    },
    warProfiteeringDocumented: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlackMarketRecord", blackMarketRecordSchema);

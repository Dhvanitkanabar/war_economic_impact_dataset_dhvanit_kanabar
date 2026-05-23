require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Conflict = require("../models/conflict.model");
const rawDataset = require("../data/war_economic_impact_dataset.json");

// Helper function to safely convert values
const toNumber = (val, defaultValue = null) => {
  if (val === undefined || val === null || val === "" || val === "null") {
    return defaultValue;
  }
  const cleanedVal = String(val).replace(/,/g, "").trim();
  const num = Number(cleanedVal);
  return isNaN(num) ? defaultValue : num;
};

const toBoolean = (val) => {
  if (val === undefined || val === null) return false;
  const str = String(val).trim().toLowerCase();
  return str === "yes" || str === "true";
};

const transformData = (data) => {
  return data.map((record) => {
    return {
      conflictName: record.Conflict_Name ? String(record.Conflict_Name).trim() : "",
      conflictType: record.Conflict_Type ? String(record.Conflict_Type).trim() : "",
      region: record.Region ? String(record.Region).trim() : "",
      startYear: toNumber(record.Start_Year, 0),
      endYear: toNumber(record.End_Year, 0),
      status: record.Status ? String(record.Status).trim() : "",
      primaryCountry: record.Primary_Country ? String(record.Primary_Country).trim() : "",
      
      preWarUnemployment: toNumber(record["Pre_War_Unemployment_%"]),
      duringWarUnemployment: toNumber(record["During_War_Unemployment_%"]),
      unemploymentSpike: toNumber(record.Unemployment_Spike_Percentage_Points),
      mostAffectedSector: record.Most_Affected_Sector ? String(record.Most_Affected_Sector).trim() : null,
      youthUnemploymentChange: toNumber(record["Youth_Unemployment_Change_%"]),
      
      preWarPovertyRate: toNumber(record["Pre_War_Poverty_Rate_%"]),
      duringWarPovertyRate: toNumber(record["During_War_Poverty_Rate_%"]),
      extremePovertyRate: toNumber(record["Extreme_Poverty_Rate_%"]),
      foodInsecurityRate: toNumber(record["Food_Insecurity_Rate_%"]),
      householdsFallenIntoPoverty: toNumber(record.Households_Fallen_Into_Poverty_Estimate),
      
      gdpChange: toNumber(record["GDP_Change_%"], 0), // GDP change is required, default to 0 if invalid
      inflationRate: toNumber(record["Inflation_Rate_%"], 0),
      currencyDevaluation: toNumber(record["Currency_Devaluation_%"]),
      warCostUsd: toNumber(record.Cost_of_War_USD, 0),
      reconstructionCostUsd: toNumber(record.Estimated_Reconstruction_Cost_USD, 0),
      
      informalEconomyPreWar: toNumber(record["Informal_Economy_Size_Pre_War_%"]),
      informalEconomyDuringWar: toNumber(record["Informal_Economy_Size_During_War_%"]),
      blackMarketActivityLevel: record.Black_Market_Activity_Level ? String(record.Black_Market_Activity_Level).trim() : null,
      primaryBlackMarketGoods: record.Primary_Black_Market_Goods ? String(record.Primary_Black_Market_Goods).trim() : null,
      currencyBlackMarketGap: toNumber(record["Currency_Black_Market_Rate_Gap_%"]),
      warProfiteeringDocumented: toBoolean(record.War_Profiteering_Documented)
    };
  });
};

const seedData = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Clear existing Conflict records
    await Conflict.deleteMany({});
    console.log("Existing conflict records deleted");

    // 3. Transform raw dataset
    const transformed = transformData(rawDataset);

    // 4. Insert transformed dataset
    const result = await Conflict.insertMany(transformed);
    console.log("Conflict records inserted successfully");
    console.log(`Total records inserted: ${result.length}`);

    // 5. Close connection and exit
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();

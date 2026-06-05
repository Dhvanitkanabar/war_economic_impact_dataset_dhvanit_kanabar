const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load model
const Conflict = require("../models/conflict.model");

// Configure dotenv
dotenv.config();

const parseNumber = (val) => {
  if (val === undefined || val === null || val === "") return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

const parseBoolean = (val) => {
  if (val === "Yes" || val === "true" || val === true) return true;
  if (val === "No" || val === "false" || val === false) return false;
  return undefined;
};

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is missing in .env");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");

    // Clear existing data
    console.log("Clearing Conflict collection...");
    await Conflict.deleteMany({});
    console.log("Conflict collection cleared");

    // Read and parse JSON
    const dataPath = path.join(__dirname, "../data/war_economic_impact_dataset.json");
    console.log(`Reading dataset from ${dataPath}...`);
    const rawData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    console.log(`Found ${rawData.length} items to seed`);

    // Map fields
    const mappedConflicts = rawData.map((item) => ({
      conflictName: item.Conflict_Name,
      conflictType: item.Conflict_Type,
      region: item.Region,
      startYear: parseNumber(item.Start_Year),
      endYear: parseNumber(item.End_Year),
      status: item.Status,
      primaryCountry: item.Primary_Country,
      preWarUnemployment: parseNumber(item["Pre_War_Unemployment_%"]),
      duringWarUnemployment: parseNumber(item["During_War_Unemployment_%"]),
      unemploymentSpike: parseNumber(item.Unemployment_Spike_Percentage_Points),
      mostAffectedSector: item.Most_Affected_Sector,
      youthUnemploymentChange: parseNumber(item["Youth_Unemployment_Change_%"]),
      preWarPovertyRate: parseNumber(item["Pre_War_Poverty_Rate_%"]),
      duringWarPovertyRate: parseNumber(item["During_War_Poverty_Rate_%"]),
      extremePovertyRate: parseNumber(item["Extreme_Poverty_Rate_%"]),
      foodInsecurityRate: parseNumber(item["Food_Insecurity_Rate_%"]),
      householdsFallenIntoPoverty: parseNumber(item.Households_Fallen_Into_Poverty_Estimate),
      gdpChange: parseNumber(item["GDP_Change_%"]),
      inflationRate: parseNumber(item["Inflation_Rate_%"]),
      currencyDevaluation: parseNumber(item["Currency_Devaluation_%"]),
      warCostUsd: parseNumber(item.Cost_of_War_USD),
      reconstructionCostUsd: parseNumber(item.Estimated_Reconstruction_Cost_USD),
      informalEconomyPreWar: parseNumber(item["Informal_Economy_Size_Pre_War_%"]),
      informalEconomyDuringWar: parseNumber(item["Informal_Economy_Size_During_War_%"]),
      blackMarketActivityLevel: item.Black_Market_Activity_Level,
      primaryBlackMarketGoods: item.Primary_Black_Market_Goods,
      currencyBlackMarketGap: parseNumber(item["Currency_Black_Market_Rate_Gap_%"]),
      warProfiteeringDocumented: parseBoolean(item.War_Profiteering_Documented),
    }));

    // Seed
    console.log("Seeding Conflicts into MongoDB...");
    const result = await Conflict.insertMany(mappedConflicts);
    console.log(`Seeded ${result.length} Conflicts successfully!`);

    mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  }
};

seedData();

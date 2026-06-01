const Conflict = require("../models/conflict.model");

// GET /search?keyword=...
const searchKeyword = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const searchQuery = {
      $or: [
        { conflictName: { $regex: keyword, $options: "i" } },
        { conflictType: { $regex: keyword, $options: "i" } },
        { region: { $regex: keyword, $options: "i" } },
        { primaryCountry: { $regex: keyword, $options: "i" } },
        { mostAffectedSector: { $regex: keyword, $options: "i" } },
        { primaryBlackMarketGoods: { $regex: keyword, $options: "i" } },
        { blackMarketActivityLevel: { $regex: keyword, $options: "i" } },
        { status: { $regex: keyword, $options: "i" } },
      ],
    };

    const conflicts = await Conflict.find(searchQuery).sort("-createdAt");

    return res.status(200).json({
      success: true,
      message: `Search results for keyword '${keyword}' fetched successfully`,
      total: conflicts.length,
      data: conflicts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to perform keyword search",
      error: error.message,
    });
  }
};

// GET /search/conflicts?country=...&region=...&type=...&status=...
const searchConflictsCategorical = async (req, res) => {
  try {
    const { country, region, type, status } = req.query;
    const filter = {};

    if (country) {
      filter.primaryCountry = { $regex: country, $options: "i" };
    }
    if (region) {
      filter.region = { $regex: region, $options: "i" };
    }
    if (type) {
      filter.conflictType = { $regex: type, $options: "i" };
    }
    if (status) {
      filter.status = { $regex: status, $options: "i" };
    }

    const conflicts = await Conflict.find(filter).sort("-createdAt");

    return res.status(200).json({
      success: true,
      message: "Categorical search results fetched successfully",
      total: conflicts.length,
      data: conflicts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to perform categorical search",
      error: error.message,
    });
  }
};

// GET /search/economic?inflation=...&poverty=...&gdp=...&currency=...
const searchEconomic = async (req, res) => {
  try {
    const { inflation, poverty, gdp, currency } = req.query;
    const filter = {};

    if (inflation) {
      filter.inflationRate = { $gte: Number(inflation) };
    }
    if (poverty) {
      filter.duringWarPovertyRate = { $gte: Number(poverty) };
    }
    if (gdp) {
      // GDP Change is negative, so search for gdp <= gdp value
      filter.gdpChange = { $lte: Number(gdp) };
    }
    if (currency) {
      filter.currencyDevaluation = { $gte: Number(currency) };
    }

    const conflicts = await Conflict.find(filter).sort("-createdAt");

    return res.status(200).json({
      success: true,
      message: "Economic search results fetched successfully",
      total: conflicts.length,
      data: conflicts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to perform economic search",
      error: error.message,
    });
  }
};

// GET /search/sector?name=...
const searchSector = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Sector name is required",
      });
    }

    const conflicts = await Conflict.find({
      mostAffectedSector: { $regex: name, $options: "i" },
    }).sort("-createdAt");

    return res.status(200).json({
      success: true,
      message: `Sector search results for '${name}' fetched successfully`,
      total: conflicts.length,
      data: conflicts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to perform sector search",
      error: error.message,
    });
  }
};

// GET /search/black-market?goods=...
const searchBlackMarket = async (req, res) => {
  try {
    const { goods } = req.query;
    if (!goods) {
      return res.status(400).json({
        success: false,
        message: "Black market goods keyword is required",
      });
    }

    const conflicts = await Conflict.find({
      primaryBlackMarketGoods: { $regex: goods, $options: "i" },
    }).sort("-createdAt");

    return res.status(200).json({
      success: true,
      message: `Black market search results for '${goods}' fetched successfully`,
      total: conflicts.length,
      data: conflicts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to perform black market search",
      error: error.message,
    });
  }
};

module.exports = {
  searchKeyword,
  searchConflictsCategorical,
  searchEconomic,
  searchSector,
  searchBlackMarket,
};

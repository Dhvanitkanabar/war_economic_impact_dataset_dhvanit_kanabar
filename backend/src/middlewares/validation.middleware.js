const validateConflict = (req, res, next) => {
  const {
    conflictName,
    conflictType,
    region,
    primaryCountry,
    startYear,
    endYear,
    inflationRate,
    gdpChange,
    duringWarPovertyRate,
    duringWarUnemployment,
  } = req.body;

  // 1. Validate Conflict Name
  if (!conflictName || typeof conflictName !== "string" || conflictName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Validate conflict name (must be a string of at least 2 chars)",
    });
  }

  // 2. Validate Conflict Type
  const validTypes = ["World War", "Civil War", "Interstate War", "Asymmetric War", "Interstate/Counter-insurgency"];
  if (!conflictType || !validTypes.includes(conflictType)) {
    return res.status(400).json({
      success: false,
      message: `Validation Error: Validate conflict type (must be one of: ${validTypes.join(", ")})`,
    });
  }

  // 3. Validate Region
  if (!region || typeof region !== "string" || region.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Validate region (required field)",
    });
  }

  // 4. Validate Country
  if (!primaryCountry || typeof primaryCountry !== "string" || primaryCountry.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Validate country (required field of at least 2 chars)",
    });
  }

  // 5. Validate Start Year
  const numericStart = Number(startYear);
  if (startYear === undefined || isNaN(numericStart) || numericStart < 1900 || numericStart > 2100) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Validate start year (must be a valid year between 1900 and 2100)",
    });
  }

  // 6. Validate End Year
  const numericEnd = Number(endYear);
  if (endYear === undefined || isNaN(numericEnd) || numericEnd < 1900 || numericEnd > 2200) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Validate end year (must be a valid year between 1900 and 2200)",
    });
  }

  if (numericEnd < numericStart) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Validate end year cannot be before start year",
    });
  }

  // 7. Validate Inflation
  if (inflationRate !== undefined) {
    const numericInflation = Number(inflationRate);
    if (isNaN(numericInflation) || numericInflation < 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Validate inflation (must be a positive number)",
      });
    }
  }

  // 8. Validate GDP Loss (GDP Change)
  if (gdpChange !== undefined) {
    const numericGdp = Number(gdpChange);
    if (isNaN(numericGdp)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Validate GDP loss (must be a valid numeric percentage change)",
      });
    }
  }

  // 9. Validate Poverty Rate
  if (duringWarPovertyRate !== undefined) {
    const numericPoverty = Number(duringWarPovertyRate);
    if (isNaN(numericPoverty) || numericPoverty < 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Validate poverty rate (must be a positive number)",
      });
    }
  }

  // 10. Validate Unemployment
  if (duringWarUnemployment !== undefined) {
    const numericUnemployment = Number(duringWarUnemployment);
    if (isNaN(numericUnemployment) || numericUnemployment < 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Validate unemployment (must be a positive number)",
      });
    }
  }

  return next();
};

module.exports = {
  validateConflict,
};

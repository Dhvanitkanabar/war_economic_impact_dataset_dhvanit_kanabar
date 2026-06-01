const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// POST /jwt/generate-token
const generateToken = async (req, res) => {
  try {
    const { email, password, userId } = req.body;

    let user;
    if (userId) {
      user = await User.findById(userId);
    } else if (email && password) {
      user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) user = null;
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or user ID provided for token generation",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "JWT token generated successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate JWT token",
      error: error.message,
    });
  }
};

// POST /jwt/verify-token
const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required in the body for verification",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User associated with token not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "JWT token is valid",
      decoded,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired JWT token",
      error: error.message,
    });
  }
};

// POST /jwt/refresh-token
const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required in the body for refresh",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "JWT token refreshed successfully",
      token: newToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Failed to refresh token: invalid or expired session",
      error: error.message,
    });
  }
};

// GET /jwt/profile
const getJwtProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "JWT profile fetched successfully",
    data: req.user,
  });
};

// GET /jwt/dashboard
const getJwtDashboard = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "JWT dashboard accessed successfully",
    user: req.user,
  });
};

// GET /jwt/admin
const getJwtAdmin = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "JWT admin route accessed successfully: welcome administrative user",
    user: req.user,
  });
};

// GET /jwt/user
const getJwtUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "JWT user route accessed successfully: welcome standard user",
    user: req.user,
  });
};

// DELETE /jwt/logout
const logoutJwt = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "JWT session logged out successfully",
  });
};

module.exports = {
  generateToken,
  verifyToken,
  refreshToken,
  getJwtProfile,
  getJwtDashboard,
  getJwtAdmin,
  getJwtUser,
  logoutJwt,
};

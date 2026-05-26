const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const conflictRoutes = require("./routes/conflict.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Mount Routes
app.use("/api/conflicts", conflictRoutes);
app.use("/api/auth", authRoutes);

// Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "WarLens API running successfully"
  });
});

module.exports = app;

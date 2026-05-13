const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "WarLens API running successfully"
  });
});

module.exports = app;

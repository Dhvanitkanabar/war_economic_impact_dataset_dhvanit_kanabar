const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser
app.use(morgan('dev')); // Logger

// Base route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'WarLens API is running...',
  });
});

// Import Routes (To be added)
// const conflictRoutes = require('./routes/conflictRoutes');
// app.use('/api/v1/conflicts', conflictRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

module.exports = app;

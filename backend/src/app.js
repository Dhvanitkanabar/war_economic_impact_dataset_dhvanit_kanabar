const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Basic Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Starter Route
app.get('/', (req, res) => {
  res.json({ message: 'WarLens API Starter' });
});

module.exports = app;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Routers
const conflictRoutes = require("./routes/conflict.routes");
const authRoutes = require("./routes/auth.routes");
const searchRoutes = require("./routes/search.routes");
const statsRoutes = require("./routes/stats.routes");
const jwtRoutes = require("./routes/jwt.routes");
const recordRoutes = require("./routes/record.routes");
const adminRoutes = require("./routes/admin.routes");
const protectedRoutes = require("./routes/protected.routes");

// Controllers for root routes
const { compareConflicts } = require("./controllers/conflict.controller");

// Middlewares
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const { generalLimiter } = require("./middlewares/rateLimit.middleware");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(generalLimiter);

// ── Root Static Routes ───────────────────────────────────────────────────────

// Health check
const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    status: "Healthy",
    uptime: process.uptime(),
    message: "API Health Check Status: Operational",
  });
};
app.get("/health", getHealth);
app.get("/api/health", getHealth);
app.head("/health", (req, res) => res.status(200).end());
app.head("/api/health", (req, res) => res.status(200).end());
app.options("/health", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS, HEAD");
  return res.sendStatus(204);
});
app.options("/api/health", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS, HEAD");
  return res.sendStatus(204);
});

// Version Check
const getVersion = (req, res) => {
  return res.status(200).json({
    success: true,
    version: "1.0.0",
    description: "War Economic Impact Dataset Analysis API",
  });
};
app.get("/version", getVersion);
app.get("/api/version", getVersion);
app.head("/version", (req, res) => res.status(200).end());
app.head("/api/version", (req, res) => res.status(200).end());
app.options("/version", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS, HEAD");
  return res.sendStatus(204);
});
app.options("/api/version", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS, HEAD");
  return res.sendStatus(204);
});

// Compare conflicts
app.get("/compare", compareConflicts);
app.get("/api/compare", compareConflicts);
app.options("/compare", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS");
  return res.sendStatus(204);
});
app.options("/api/compare", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS");
  return res.sendStatus(204);
});

// ── Mount Routes (Supporting both root and /api prefixes) ────────────────────

// Conflicts Router
app.use("/api/conflicts", conflictRoutes);
app.use("/conflicts", conflictRoutes);

// Auth Router
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// Search Router
app.use("/api/search", searchRoutes);
app.use("/search", searchRoutes);

// Stats Router
app.use("/api/stats", statsRoutes);
app.use("/stats", statsRoutes);

// JWT Router
app.use("/api/jwt", jwtRoutes);
app.use("/jwt", jwtRoutes);

// Protected Router
app.use("/api/protected", protectedRoutes);
app.use("/protected", protectedRoutes);

// Admin Router
app.use("/api/admin", adminRoutes);
app.use("/admin", adminRoutes);

// Generic Sub-Records Router (countries, regions, records POST/PUT/DELETE)
// Mounted at root to support /regions, /countries, /economic-records, etc.
app.use("/api", recordRoutes);
app.use("/", recordRoutes);

// Default Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WarLens API running successfully",
  });
});

// ── Error Boundary Middlewares ───────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;

# WarLens — Global War Economic Impact Analysis Platform

WarLens is a professional, full-stack analytics platform designed to analyze, manage, and visualize the multi-dimensional economic and socioeconomic impacts of global wars and conflicts.

This repository contains a high-performance **Express/Node.js & MongoDB Backend** with over 100 fully-implemented API endpoints, robust JWT security, generic record management, full-text and categorical search operators, custom rate limiters, schema validations, and a comprehensive React skeleton structure.

---

## 🛠 Technology Stack

### Backend Engine
- **Node.js** — High-performance Javascript runtime environment.
- **Express.js** — Minimalist, robust server framework.
- **MongoDB** — Document-based NoSQL database for unstructured and flexible records.
- **Mongoose** — Elegant schema-based modeling tool for MongoDB.
- **JSON Web Token (JWT)** — Secure, stateless client-server session authentication.
- **bcryptjs** — Salted password hashing for cryptographic safety.

### Frontend Skeleton
- **React.js** — Component-driven frontend user interface library.
- **Vite** — Extreme-speed frontend development build tool.
- **Tailwind CSS** — Modern utility-first CSS framework.
- **Recharts** — High-performance chart rendering library.
- **Redux** — Unified application state management.

---

## 📂 Project Directory Structure

```
war_economic_impact_dataset_dhvanit_kanabar/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection configuration
│   │   ├── controllers/     # Handlers mapping routes to database logic
│   │   ├── data/            # Local data resources (dataset JSON)
│   │   ├── docs/            # Postman collections documentation
│   │   ├── middlewares/     # Auth checks, rate-limiters, input validation
│   │   ├── models/          # Mongoose database models and schemas
│   │   ├── routes/          # Express route definitions
│   │   ├── seed/            # Ingestion scripts seeding dummy conflict data
│   │   ├── utils/           # Global async wrappers & response formatters
│   │   ├── validations/     # Request schema validations
│   │   ├── app.js           # Express app setup and middleware routing
│   │   └── index.js         # Port listener and MongoDB initializer
│   ├── package.json         # Backend dependencies & run scripts
│   └── README.md            # Detailed Backend API guide & Endpoints tables
├── frontend/
│   ├── public/              # Static public assets
│   ├── src/                 # React source code skeleton
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json         # Frontend dependencies & Vite configurations
│   └── README.md            # Frontend overview
├── docs/                    # Global specifications and schema planning
└── README.md                # Project landing overview
```

---

## ✅ Completed REST API Capabilities

The backend REST API implementation is **100% complete**, fully verified, and ready for deployment. The following capabilities are fully operational:

- [x] **Dual route prefixing**: Seamless support for both root (`/`) and conventional `/api/` routing.
- [x] **Auxiliary record collections**: Dedicated Mongoose models for Region, Country, EconomicRecord, PovertyRecord, InflationRecord, BlackMarketRecord, WarCostRecord, ReconstructionRecord, and UnemploymentRecord.
- [x] **Query filters & mapping**: Direct mapping of raw dataset headers (e.g. `Inflation_Rate_%`) to schema camelCase fields, support for numeric range boundaries, above/below operators, and chronicle/timeline overlap.
- [x] **Keyword & Categorical search**: Full-text regex search and specific country/region/type/status/sector categorical lookup.
- [x] **Custom rate-limiting**: High-performance in-memory IP rate limiter protecting logins, searches, and administrative bulk uploads.
- [x] **Input validations**: Type, format, and value boundaries for conflict registration.
- [x] **Individual statistic peaks**: Separate statistical endpoints returning total conflicts, resolved, ongoing, and extreme averages.
- [x] **Comparison endpoints**: Side-by-side comparison of 2 conflicts.
- [x] **AI conflict summary**: Smart aggregration-based rule-generator producing overview texts.
- [x] **Authentication & JWT testing**: Full registration, login, logout, password resets, refresh tokens, and dedicated JWT test vectors.
- [x] **Administrative controls**: Role authorization restricting write, edit, and delete actions.
- [x] **Postman documentation**: Complete collection covering all 100+ endpoints across 13 highly-structured folders.

---

## 🚀 Setting Up Locally

### 1. Backend Ingestion & Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (copying `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Seed database from the JSON dataset:
   ```bash
   npm run seed
   ```
5. Start development backend:
   ```bash
   npm run dev
   ```

### 2. Frontend Launch
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend dev server:
   ```bash
   npm run dev
   ```

---

## 👥 Author
**Dhvanit Kanabar**

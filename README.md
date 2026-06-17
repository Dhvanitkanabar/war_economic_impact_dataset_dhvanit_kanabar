# 🌍 WarLens

### AI-Powered War Economic Impact Analysis Dashboard

**WarLens** is a professional, industry-quality full-stack MERN dashboard designed to analyze and visualize the profound economic impacts of global conflicts. Leveraging interactive data visualizations, advanced search/filtering, and real-time state synchronization, the platform centralizes key metrics—such as GDP contraction, inflation spikes, reconstruction costs, unemployment rates, and black market activity levels—into a cohesive, role-based analytics portal.

---

## 🔗 Live Demo

- **Frontend Application:** [https://warlens-rosy.vercel.app](https://warlens-rosy.vercel.app)
- **Backend API Base:** [https://war-economic-impact-dataset-dhvanit.onrender.com/api](https://war-economic-impact-dataset-dhvanit.onrender.com/api)
- **GitHub Repository:** [https://github.com/Dhvanitkanabar/war_economic_impact_dataset_dhvanit_kanabar](https://github.com/Dhvanitkanabar/war_economic_impact_dataset_dhvanit_kanabar)

---

## 🚀 Key Features

### 📊 Analytics & Interactive Visualizations
* **Dynamic Recharts Integration:** Responsive charts displaying region distribution, conflict types, war expenses, and economic indicators.
* **Unified Statistics Overview:** Real-time metrics displaying total tracked conflicts, ongoing vs. resolved wars, and records with the highest inflation or lowest GDP changes.

### 🔍 Advanced Search, Filtering, and Pagination
* **Keyword & Field Search:** Instant searches by conflict name, primary country, or affected sectors.
* **Granular Multi-Filter:** Filter results dynamically by region, conflict type, status, and various economic parameters.
* **State Persistence:** Filter settings, page states, and sort choices are persisted in session storage to improve navigation.

### 🔐 Authentication & Role-Based Access Control (RBAC)
* **Secure JWT flow:** Registration and login endpoints using hashed credentials and secure token-based authorization.
* **Route Protection:** Seamless client-side protection with custom `ProtectedRoute`, `AdminRoute`, and `GuestRoute` components.
* **Administrative Controls:** Dedicated admin panel with CRUD capability (Create, Read, Update, Delete) to manage conflicts safely.

### 🎨 Premium UI/UX & Quality-of-Life Systems
* **System Theme Sync:** Dark and light modes with optimized contrast, micro-animations, and smooth transitions.
* **Optimized Rendering Performance:** Implemented React Code Splitting (`lazy`/`Suspense`), `useMemo`, and `useCallback` to maximize client efficiency.
* **Robust Error Handling:** Integrated unified toast notifications (`react-hot-toast`) and a global React `ErrorBoundary` component to capture and display fallbacks gracefully.

---

## 📂 Project Structure

```bash
warlens/
│
├── frontend/                     # React / Vite Client Application
│   ├── src/
│   │   ├── api/                  # Axios instances and base configurations
│   │   ├── app/                  # Redux global store configurations
│   │   ├── components/           # Common components (Navbar, Footer, ErrorBoundary)
│   │   │   ├── auth/             # Protected and role-based route guards
│   │   │   └── forms/            # Form inputs and submit buttons
│   │   ├── features/             # Redux slices (auth)
│   │   ├── layouts/              # Main layout wraps
│   │   ├── pages/                # Analytics, Dashboard, Conflicts, Admin CRUD pages
│   │   ├── App.jsx               # Application main router config
│   │   └── main.jsx              # React mounting and initializations
│   └── package.json
│
├── backend/                      # Node / Express API Service
│   ├── src/
│   │   ├── config/               # Database and authentication configs
│   │   ├── controllers/          # API endpoint logic handlers
│   │   ├── models/               # Mongoose schemas (User, Conflict)
│   │   ├── routes/               # Express routing tables
│   │   ├── seed/                 # Seeding scripts for initial datasets
│   │   └── middlewares/          # JWT and role-based authorization check handlers
│   └── package.json
│
└── docs/                         # Additional project documentation
```

---

## 📊 Dataset Metadata

The platform tracks and aggregates a specialized dataset containing:
* **Conflict Identification:** Name, Type, Region, Primary Country, and Duration (Start/End Years).
* **Macroeconomic Data:** GDP Change (%), Inflation Rate (%), and Unemployment Spikes.
* **Social Indicators:** Pre/During war poverty levels, Food Insecurity Rate (%), and household poverty counts.
* **Financial Burden:** War expenses (USD) and estimated Reconstruction Costs (USD).
* **Black Market Metrics:** Activity levels, primary traded commodities, and currency gaps.

---

## 📌 API Reference Highlights

### Authentication & Profiles
```http
POST /api/auth/register    - Register a new user account
POST /api/auth/login       - Retrieve JWT session token
GET  /api/auth/profile     - Fetch profile information (Protected)
```

### Conflict Management & CRUD
```http
GET    /api/conflicts      - Paginated, searchable & filterable list of conflicts
GET    /api/conflicts/:id  - Get details of a single conflict
POST   /api/conflicts      - Add a new conflict record (Admin only)
PUT    /api/conflicts/:id  - Update an existing conflict record (Admin only)
DELETE /api/conflicts/:id  - Remove a conflict record (Admin only)
```

### Statistics & Aggregates
```http
GET /api/conflicts/stats/overview           - Get overall dashboard metrics
GET /api/conflicts/stats/highest-inflation   - Fetch conflict with highest inflation
GET /api/conflicts/stats/lowest-gdp         - Fetch conflict with lowest GDP
GET /api/conflicts/analytics/region-distribution  - Region distribution counts
GET /api/conflicts/analytics/type-distribution    - Type distribution counts
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster or local MongoDB instance

### 1. Setup Backend Server
```bash
cd backend
npm install
```
* Create a `.env` file in the `backend` folder and populate it:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
* Run the seeding script to populate default data:
```bash
npm run seed
```
* Start the server in development mode:
```bash
npm run dev
```

### 2. Setup Frontend Client
```bash
cd ../frontend
npm install
```
* Create a `.env` file in the `frontend` folder and add:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
* Start the frontend development server:
```bash
npm run dev
```

---

## 👨‍💻 Developer & Portfolio

Developed and maintained by **Dhvanit Kanabar**.

* **GitHub:** [https://github.com/Dhvanitkanabar](https://github.com/Dhvanitkanabar)
* **LinkedIn:** [https://www.linkedin.com/in/dhvanit-kanabar/](https://www.linkedin.com/in/dhvanit-kanabar/)

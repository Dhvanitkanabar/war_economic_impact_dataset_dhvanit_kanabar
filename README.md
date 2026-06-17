# 🌍 WarLens – War Economic Impact Analysis Platform

## 📖 Overview

WarLens is a full-stack data analytics platform designed to analyze the economic impact of wars and conflicts around the world.

The platform provides insights into inflation, GDP decline, unemployment, poverty rates, food insecurity, reconstruction costs, war expenses, and black market activities caused by conflicts.

WarLens helps users explore historical and ongoing conflicts through powerful search, filtering, analytics, and visualization tools.

---

## 🎯 Problem Statement

Wars affect economies in multiple ways, but the data is often scattered across reports and datasets.

WarLens centralizes this information and provides:

* Economic impact analysis
* Conflict statistics
* Region-wise insights
* Searchable conflict database
* Interactive analytics dashboard
* Role-based administration system

---

## 🚀 Features

### Conflict Management

* Create conflict records
* View all conflicts
* View conflict details
* Update conflict information
* Delete conflict records

### Search & Filtering

* Keyword search
* Region filtering
* Country filtering
* Conflict type filtering
* Status filtering
* Economic indicator filtering

### Sorting & Pagination

* Inflation sorting
* GDP sorting
* War cost sorting
* Reconstruction cost sorting
* Paginated results

### Statistics

* Total conflicts
* Ongoing conflicts
* Resolved conflicts
* Highest inflation conflict
* Lowest GDP conflict
* Highest war cost conflict
* Highest reconstruction cost conflict

### Analytics

* Region distribution
* Conflict type distribution
* War cost by region
* Inflation by region
* Sector impact analysis

### Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Admin Authorization

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS (Planned)
* Redux Toolkit
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcryptjs

### Testing

* Postman

### Deployment

* Render (Backend)
* Vercel (Frontend – Planned)

---

## 📂 Project Structure

```bash
warlens/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── seed/
│   │   ├── utils/
│   │   └── data/
│   └── README.md
│
└── docs/
```

---

## 🔐 Authentication Flow

1. User registers an account.
2. User logs in.
3. Server generates JWT token.
4. Token is sent with protected requests.
5. Middleware verifies token.
6. Admin-only routes require admin role.

---

## 📊 Dataset Information

The project uses a curated War Economic Impact Dataset containing:

* Conflict Name
* Conflict Type
* Region
* Country
* Start Year
* End Year
* Inflation Rate
* GDP Change
* Poverty Rate
* Food Insecurity
* Unemployment
* War Cost
* Reconstruction Cost
* Black Market Activity
* Currency Devaluation

---

## 🌐 Live Deployment

### Backend API

```txt
https://war-economic-impact-dataset-dhvanit.onrender.com
```

### API Base URL

```txt
https://war-economic-impact-dataset-dhvanit.onrender.com/api
```

---

## 📌 API Highlights

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Conflicts

```http
GET    /api/conflicts
GET    /api/conflicts/:id
POST   /api/conflicts
PUT    /api/conflicts/:id
PATCH  /api/conflicts/:id
DELETE /api/conflicts/:id
```

### Search

```http
GET /api/conflicts/search?keyword=Japan
```

### Statistics

```http
GET /api/conflicts/stats/overview
GET /api/conflicts/stats/highest-inflation
GET /api/conflicts/stats/lowest-gdp
```

### Analytics

```http
GET /api/conflicts/analytics/region-distribution
GET /api/conflicts/analytics/type-distribution
GET /api/conflicts/analytics/war-cost-by-region
```

---

## 🎓 What I Learned

Through this project, I gained hands-on experience in:

* Express.js Architecture
* MongoDB & Mongoose
* REST API Development
* JWT Authentication
* Role-Based Access Control (RBAC)
* Middleware Design
* Search APIs
* Filtering, Sorting & Pagination
* Aggregation Pipelines
* API Documentation
* Postman Testing
* Deployment using Render
* GitHub Pull Request Workflow

---

## 📈 Current Status

### Backend
✅ Completed
* CRUD APIs
* Search APIs
* Statistics APIs
* Analytics APIs
* Authentication
* Authorization
* Error Handling
* Documentation
* Deployment

### Frontend
✅ Completed
* React / Vite Setup
* Code Splitting (lazy loading) & Suspense
* State Management (Redux Slices)
* Responsive Analytics charts (Recharts)
* Unified Notification and Error boundary system

---

## 🚀 Installation & Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or Atlas cluster)

### Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in a `.env` file (e.g. `PORT=5000`, `MONGO_URI`, `JWT_SECRET`).
4. Seed the database (optional):
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set base URL in a `.env` file (e.g. `VITE_API_BASE_URL=http://localhost:5000/api`).
4. Start the frontend:
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots & Previews

*Here are some visual demonstrations of the application:*

- **Dark Mode Analytics**:
  *(A dynamic dark mode dashboard featuring pie charts for regional distribution, bar charts for cost comparisons, and line charts for historical trends)*
- **Light Mode Transition**:
  *(Theme-switched settings and profile menus showing polished, high-contrast light mode styling)*
- **Interactive Map / Conflict Database**:
  *(Advanced filtering fields and sorted paginated views for conflicts)*

---

## 👨‍💻 Developer

**Dhvanit Kanabar**

* GitHub: https://github.com/Dhvanitkanabar
* LinkedIn: https://www.linkedin.com/in/dhvanit-kanabar/

---

## 📜 License

This project is developed for educational and academic purposes.


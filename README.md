# WarLens — Global War Economic Impact Analysis Platform

## Project Overview

WarLens is a professional, full-stack analytics platform designed to analyze and visualize the economic impact of global wars and conflicts. It provides a deep dive into how large-scale conflicts reshape national and global economies, affecting everything from GDP to individual poverty levels.

The platform provides detailed insights into:

- **GDP loss**: Direct impact on national production.
- **Inflation spikes**: Drastic changes in consumer price indices.
- **Poverty growth**: Socio-economic decline due to instability.
- **Unemployment impact**: Labor market disruptions in conflict zones.
- **Food insecurity**: Supply chain breakdowns and agricultural loss.
- **Currency devaluation**: Loss of purchasing power and monetary stability.
- **Black market activities**: Rise of informal and illicit economies.
- **Reconstruction costs**: Estimated capital required for post-war recovery.
- **War profiteering**: Analysis of entities benefiting from conflict.

The system enables users to explore historical and ongoing conflicts through powerful filtering, searching, sorting, pagination, and interactive analytics dashboards.

---

# Dataset Information

**Dataset Name**: `war_economic_impact_dataset`

The dataset contains records of various wars and conflicts across multiple countries and regions with detailed economic and social impact indicators.

**Key Conflicts Included**:
- World War II (WWII)
- Russia-Ukraine War
- Syrian Civil War
- Iraq War
- Afghanistan War
- Israel-Hamas War
- Yemen Civil War
- Tigray Conflict

---

# Tech Stack

### Backend
- **Node.js** & **Express.js**: Scalable server-side logic.
- **MongoDB** & **Mongoose**: Flexible NoSQL document database.
- **JWT Authentication**: Secure stateless authentication.
- **bcrypt**: Password hashing for security.
- **dotenv**: Environment variable management.
- **cors**: Cross-Origin Resource Sharing.
- **morgan**: HTTP request logger.

### Frontend
- **React.js** (Vite): Modern, fast UI development.
- **Tailwind CSS**: Utility-first styling for premium design.
- **Material UI (MUI)**: High-quality UI components.
- **Axios**: Promise-based HTTP client.
- **Recharts**: Composable charting library for data visualization.

---

# Core Features

### 🔐 Authentication System
- User Registration & Secure Login.
- JWT-based Session Management.
- Protected Routes for sensitive data.
- Role-Based Access Control (RBAC) - User vs. Admin.

### ⚔️ Conflict Management (CRUD)
- **Create**: Add new conflict data records.
- **Read**: Fetch and view detailed conflict analysis.
- **Update**: Modify existing economic indicators.
- **Delete**: Remove records (Admin only).

### 🔍 Advanced Data Navigation
- **Filtering**: By Region, Country, Conflict Type, Status, Inflation Rate, GDP Loss, etc.
- **Search**: Real-time search by name, country, region, or keywords.
- **Sorting**: Order by Inflation, War Cost, Start Year, or Poverty Rate.
- **Pagination**: Optimized data fetching for large datasets.

### 📊 Analytics & Aggregation
Advanced MongoDB aggregation pipelines provide:
- Total & Ongoing conflict metrics.
- Regional economic impact summaries.
- Highest inflation and GDP loss rankings.
- Sector-wise impact analysis (Agriculture, Tech, Infrastructure).

---

# Architecture

### Backend (MVC Pattern)
The backend follows a clean, industry-standard Model-View-Controller (MVC) architecture.
`Route → Controller → Service → Model`

```text
backend/
 ├── src/
 │    ├── config/       # Database & Env configurations
 │    ├── controllers/  # Request handling logic
 │    ├── middlewares/  # Auth & Validation middlewares
 │    ├── models/       # Mongoose schemas
 │    ├── routes/       # API endpoints
 │    ├── services/     # Business logic layer
 │    ├── validations/  # Request body validation (Joi/Zod)
 │    ├── utils/        # Helper functions
 │    ├── constants/    # Global constants
 │    ├── seed/         # Initial data seeding scripts
 │    ├── app.js        # Express app setup
 │    └── server.js     # Server entry point
```

### Frontend
A scalable React architecture focused on modularity and reusability.

```text
frontend/
 ├── src/
 │    ├── api/          # Axios instance & API calls
 │    ├── assets/       # Static files (images, icons)
 │    ├── components/   # Reusable UI components
 │    ├── layouts/      # Page structures (Navbar, Sidebar)
 │    ├── pages/        # Main route components
 │    ├── redux/        # Global state management
 │    ├── charts/       # Recharts implementations
 │    ├── styles/       # Global CSS & Theme setup
 │    ├── App.jsx       # Root component
 │    └── main.jsx      # Entry point
```

---

# Planned Dashboards
- **Global Conflict Dashboard**: High-level overview of world impact.
- **Country Comparison**: Side-by-side economic analysis.
- **Inflation & Poverty Trends**: Timeline-based visualization.
- **War Cost Analytics**: Financial breakdown of conflicts.
- **Admin Analytics**: System health and data management.

---

# Security Features
- **JWT Authentication**: Secure token-based access.
- **Password Hashing**: `bcrypt` encryption for user credentials.
- **Rate Limiting**: Protection against DDoS and brute force.
- **Input Validation**: Sanitizing all incoming data.
- **CORS Configuration**: Restricting access to authorized domains.

---

# Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd WarLens
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

# Future Improvements
- **Interactive World Map**: SVG/Leaflet-based visualization of conflict zones.
- **AI Prediction**: Predicting reconstruction costs based on historical data.
- **Data Export**: PDF/CSV exports for economic researchers.
- **Real-time News Integration**: Live updates on ongoing conflicts.

---

# Project Status Checklist

### Backend
- [ ] Initial Setup & Config
- [ ] Authentication System
- [ ] Conflict CRUD APIs
- [ ] Aggregation Pipelines
- [ ] API Documentation (Swagger)

### Frontend
- [ ] UI/UX Design (Figma-inspired)
- [ ] Dashboard Development
- [ ] Analytics Charts Integration
- [ ] API Integration
- [ ] Responsive Design Polish

---

# Author
**Dhvanit Kanabar**
Project Lead & Full Stack Developer

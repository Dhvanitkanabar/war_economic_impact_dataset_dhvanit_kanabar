# War Economic Impact Dataset API

Professional Node.js & Express API for conflict economic impact analysis.

## Project Overview
The War Economic Impact Dataset API is a high-performance, robust, and secure server-side application designed to store, manage, analyze, and query multi-dimensional datasets regarding the economic and socioeconomic effects of historical and modern warfare. 

This platform enables researchers, analysts, and developers to assess the repercussions of conflicts across macroeconomics, labor market disruptions, poverty rates, informal economies, and reconstruction costs. It provides standard CRUD services, complex search operators, region-level aggregations, custom statistics, and strict administrative authentication controls.

## Tech Stack

### Backend Core
- **Node.js** - High-performance runtime environment.
- **Express.js** - Minimalist, robust web server framework.
- **MongoDB** - Document-based NoSQL database for unstructured and flexible records.
- **Mongoose** - Elegant schema-based modeling tool for MongoDB.

### Authentication & Security
- **JSON Web Token (JWT)** - Secure and stateless client-server authentication.
- **bcryptjs** - Salted password hashing for cryptographic safety.

### Development Tools
- **Postman** - Comprehensive API client testing.
- **Git & GitHub** - Distributed version control and repository sync.

---

## Features
- **✔ Secure Authentication**: Registration and Login flows with salted hashing.
- **✔ CRUD APIs**: Full Create, Read, Update, and Delete capabilities for conflict records.
- **✔ Filtering**: Rich query operations mapping regions, status types, inflation rate boundaries, and war costs.
- **✔ Sorting**: Standard sorting algorithms across database entries (e.g. inflation, GDP, timeline).
- **✔ Pagination**: Dynamic pagination controls limiting records returned per query page.
- **✔ Multi-Field Search**: Contextual full-text regex search across conflict names, countries, and regions.
- **✔ Statistics APIs**: Quick statistical summaries (average inflation, lowest GDP, highest war costs, reconstruction).
- **✔ Aggregation & Analytics**: Deep aggregate analysis (regional cost sum, conflict type counts, sector impacts).
- **✔ Protected & Admin-Only Routes**: Write, update, and delete actions are strictly restricted to users with verified administrative roles.
- **✔ Robust Error Handling**: Standard route validation, async wrappers, custom 404 handlers, and global exception boundaries.

---

## Folder Structure

```
backend/
├── src/
│   ├── config/          # Database connection and system configurations
│   ├── constants/       # Reusable global constant definitions
│   ├── controllers/     # Request handlers mapping routes to database logic
│   ├── data/            # Local data resources
│   ├── docs/            # Endpoint reference documents
│   ├── middlewares/     # Authentication, role controls, and error boundaries
│   ├── models/          # Mongoose database models and schemas
│   ├── routes/          # API route definitions
│   ├── seed/            # Seeding scripts to populate dummy conflict data
│   ├── services/        # Auxiliary utility scripts
│   ├── utils/           # Async wrappers and success response utilities
│   ├── validations/     # Request validation rules
│   ├── app.js           # Express app setup and middleware routing
│   └── index.js         # Port listener and MongoDB initializer
├── .env.example         # System configuration template file
├── package.json         # Node dependencies and project build scripts
└── README.md            # Project overview and basic setup guide
```

---

## Installation Steps

Follow these steps to set up the API locally:

### 1. Clone the repository
```bash
git clone <repo_url>
```

### 2. Navigate to the backend directory
```bash
cd backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Create local environment configuration
Copy the template environment file and fill in your details:
```bash
cp .env.example .env
```

### 5. Start the development server
```bash
npm run dev
```

---

## Environment Variables

The application requires the following environment variables (defined in `.env`):

- `PORT` - The port on which the Express server will run (e.g., `5000`).
- `MONGO_URI` - MongoDB database connection URI (e.g., `mongodb://127.0.0.1:27017/warLens`).
- `JWT_SECRET` - Secret cryptographic key used to generate and verify JWTs.

---

## API Endpoint Documentation

The API includes the following core endpoints:

### AUTH APIs
- `POST /api/auth/register` - Create a new user account.
- `POST /api/auth/login` - Authenticate credentials and receive a JWT.
- `GET /api/auth/profile` - Retrieve detailed profile info of the logged-in user (requires Bearer token).

### CONFLICT APIs
- `GET /api/conflicts` - Fetch all conflicts with optional filters, pagination, and sorting (Public).
- `GET /api/conflicts/:id` - Fetch details of a specific conflict (Public).
- `POST /api/conflicts` - Create a new conflict record (Admin-Only).
- `PUT /api/conflicts/:id` - Replace a conflict record (Admin-Only).
- `PATCH /api/conflicts/:id` - Update specific fields of a conflict record (Admin-Only).
- `DELETE /api/conflicts/:id` - Delete a conflict record (Admin-Only).

### SEARCH APIs
- `GET /api/conflicts/search` - Full-text regex search query mapping conflicts (Public).

### STATISTICS APIs (Public)
- `GET /api/conflicts/stats/overview` - Overview of database averages (GDP, inflation, unemployment, etc.).
- `GET /api/conflicts/stats/highest-inflation` - Retrieve conflict details with the highest inflation rate.
- `GET /api/conflicts/stats/lowest-gdp` - Retrieve conflict details with the lowest GDP change.
- `GET /api/conflicts/stats/highest-war-cost` - Retrieve conflict details with the highest war cost.
- `GET /api/conflicts/stats/highest-reconstruction-cost` - Retrieve conflict details with the highest reconstruction cost.

### ANALYTICS APIs (Public)
- `GET /api/conflicts/analytics/region-distribution` - Number of conflicts grouped by geographic region.
- `GET /api/conflicts/analytics/type-distribution` - Conflict counts grouped by combat class type.
- `GET /api/conflicts/analytics/war-cost-by-region` - Sum and averages of war costs grouped by region.
- `GET /api/conflicts/analytics/inflation-by-region` - Average and extreme inflation rates grouped by region.
- `GET /api/conflicts/analytics/sector-impact` - GDP and unemployment averages grouped by the most affected economic sector.

---

## Testing Instructions

To test these APIs seamlessly, use the following flow in Postman:

1. **Import Collection**: Import the provided collection JSON file `docs/postman/war-lens-api.postman_collection.json` into Postman.
2. **Configure Environment Variables**: Set a global or environment variable `baseUrl` to `http://localhost:5000/api`.
3. **Register User**: Execute the `Register` POST request in the `AUTH` folder to create a new user.
4. **Login**: Execute the `Login` POST request using the registered credentials. Copy the returned `token` from the response.
5. **Set Authorization Bearer**: Set the retrieved token as the Bearer Token in your environment or directly under the Headers section as `Authorization: Bearer <your_jwt_token>`.
6. **Test Protected Routes**: Try to call any modify route (e.g. `POST /api/conflicts`). 
   - A normal user token will return a `403 Access denied, admin only` response.
   - An admin token (role manually upgraded in the database) will allow full management access.

---

## Future Improvements
- **Refresh Tokens**: Set up automatic token rotation for enhanced session persistence.
- **Email Verification**: Implement secure verification flows via SMTP server during signup.
- **Dashboard Frontend**: Develop a comprehensive React or Next.js visualization dashboard.
- **Export Reports**: Add endpoint support to export aggregations as CSV/PDF files.
- **Advanced Analytics**: Integrate advanced machine learning modeling to forecast post-conflict reconstruction timelines.

---

## Project Status
The backend REST API implementation is 100% complete, fully verified, and ready for integration. All features are fully functional:
- [x] Express App Setup
- [x] MongoDB Connection
- [x] Conflict Dataset Seeding
- [x] CRUD APIs
- [x] Filtering, Sorting, and Pagination
- [x] Keyword Search
- [x] Stats Aggregations
- [x] Analytics Aggregations
- [x] JWT Authentication
- [x] Protected Routes & Role Authorization
- [x] Global Error Handling
- [x] API Documentation & Postman Collection


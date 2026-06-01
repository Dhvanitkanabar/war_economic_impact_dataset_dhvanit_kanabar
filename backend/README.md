# WarLens API — Global War Economic Impact Analysis Platform (Backend)

The **WarLens REST API** is a high-performance, robust, secure, and fully-featured server-side application designed to store, manage, analyze, and query multi-dimensional datasets regarding the economic and socioeconomic effects of historical and modern warfare.

This backend engine enables researchers, analysts, and developers to assess the repercussions of conflicts across macroeconomics, labor market disruptions, poverty rates, informal economies, and reconstruction costs. It provides standard CRUD services, complex search operators, region-level aggregations, custom statistics, and strict administrative authentication controls.

---

## 🚀 Key Features

- **🛡 Complete JWT Authentication**: Registration, Login, Stateless Session Logout, Forgot/Reset password flows, Token rotation, and self account deletion.
- **✨ Complete REST Endpoints Coverage**: Over 100 fully-implemented API routes covering all CRUD, parametric filters, query filters, search patterns, statistics, analytics, administrative dashboards, and HEAD/OPTIONS hooks.
- **📈 Advanced Query Parameters**:
  - Aliases mapping: `country` ➔ `primaryCountry`, `type` ➔ `conflictType`, `sector` ➔ `mostAffectedSector`, `blackMarket` ➔ `blackMarketActivityLevel`, `profiteering` ➔ `warProfiteeringDocumented`.
  - Numeric operators: `inflationAbove`, `inflationBelow`, `gdpLossAbove` (gdpChange <= -value), `povertyAbove`, `foodInsecurityAbove`, `currencyGapAbove`, `warCostAbove`, `reconstructionAbove`.
  - Chronicle/Timeline range queries: `startYear`, `endYear`, and specific `year` (checking overlap).
- **🔀 Advanced Sorting Mapper**: Map dataset headers (`Inflation_Rate_%`, `GDP_Change_%`, `Estimated_Reconstruction_Cost_USD`, `Cost_of_War_USD`) directly to schema-safe Mongoose fields, supporting ascending and descending order.
- **⏹ Custom Rate Limiting Middleware**: Custom in-memory rate limiter with window configuration and specialized limit pools:
  - **General**: 100 req / min
  - **Auth & Brute Force Prevention**: 15 req / min
  - **Search**: 30 req / min
  - **Admin**: 30 req / min
  - **Bulk Upload**: 5 req / min
- **✅ Input Validation Middleware**: Strict range, format, and type validations protecting database integrity.
- **💥 Error Boundaries**: Global exception boundaries with custom formatting for invalid MongoDB IDs, duplicates, non-existent endpoints, and unauthorized access.
- **🔂 Dual Route Mounts**: Mounted under BOTH root `/` and `/api/` prefixes for seamless client integrations.

---

## 📂 Backend Directory Structure

```
backend/
├── src/
│   ├── config/          # Database connection and system configurations
│   ├── constants/       # Reusable global constant definitions
│   ├── controllers/     # Request handlers mapping routes to database logic
│   │   ├── auth.controller.js       # Registered users and password reset flows
│   │   ├── conflict.controller.js   # Main conflicts CRUD, parametric, projections
│   │   ├── jwt.controller.js        # JWT token generation, verification, and testing
│   │   ├── record.controller.js     # Generic CRUD handlers for Region, Country, sub-records
│   │   ├── search.controller.js     # Keyword, categorical, economic, sector search
│   │   └── stats.controller.js      # Individual peak statistics, admin dashboard stats
│   ├── data/            # Local data resources (dataset JSON)
│   ├── docs/            # Postman collection files
│   ├── middlewares/     # Authentication, role controls, rate-limiting, validations
│   │   ├── auth.middleware.js       # JWT protector and admin privileges
│   │   ├── error.middleware.js      # Global error boundaries and 404 handlers
│   │   ├── rateLimit.middleware.js  # In-memory IP rate-limiters
│   │   └── validation.middleware.js # Schema field validators
│   ├── models/          # Mongoose database models and schemas
│   │   ├── blackMarketRecord.model.js
│   │   ├── conflict.model.js
│   │   ├── country.model.js
│   │   ├── economicRecord.model.js
│   │   ├── inflationRecord.model.js
│   │   ├── povertyRecord.model.js
│   │   ├── region.model.js
│   │   ├── reconstructionRecord.model.js
│   │   ├── unemploymentRecord.model.js
│   │   ├── user.model.js
│   │   └── warCostRecord.model.js
│   ├── routes/          # API route definitions
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── conflict.routes.js
│   │   ├── jwt.routes.js
│   │   ├── protected.routes.js
│   │   ├── record.routes.js
│   │   ├── search.routes.js
│   │   └── stats.routes.js
│   ├── seed/            # Seeding scripts to populate dummy conflict data
│   ├── services/        # Auxiliary utility scripts
│   ├── utils/           # Async wrappers and success response utilities
│   ├── app.js           # Express app setup and middleware routing
│   └── index.js         # Port listener and MongoDB initializer
├── package.json         # Node dependencies and project build scripts
└── README.md            # Backend overview and setup guide
```

---

## 🛠 Complete API Endpoints List

All routes are fully implemented, tested, and support `OPTIONS` and `HEAD` hooks where appropriate. They are accessible with or without the `/api` prefix.

### 1. Basic CRUD Routes
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/conflicts` | Fetch all conflicts with filters, paging, sorting | Public |
| GET | `/conflicts/:id` | Fetch conflict by MongoDB ObjectId | Public |
| POST | `/conflicts` | Create new conflict record | Admin-Only |
| PUT | `/conflicts/:id` | Replace conflict record | Admin-Only |
| PATCH | `/conflicts/:id` | Update selected conflict details | Admin-Only |
| DELETE | `/conflicts/:id` | Delete conflict | Admin-Only |

### 2. Route Parameters (Fetch by Exact Metric)
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/conflicts/name/:name` | Fetch conflicts by name | Public |
| GET | `/conflicts/type/:type` | Fetch conflicts by combat type | Public |
| GET | `/conflicts/region/:region` | Fetch conflicts by region | Public |
| GET | `/conflicts/status/:status` | Fetch conflicts by status | Public |
| GET | `/conflicts/country/:country` | Fetch conflicts by primary country | Public |
| GET | `/conflicts/start-year/:year` | Fetch conflicts by start year | Public |
| GET | `/conflicts/end-year/:year` | Fetch conflicts by end year | Public |
| GET | `/conflicts/inflation/:rate` | Fetch conflicts by inflation rate | Public |
| GET | `/conflicts/gdp-loss/:percentage` | Fetch conflicts by GDP change | Public |
| GET | `/conflicts/poverty/:rate` | Fetch conflicts by poverty rate | Public |
| GET | `/conflicts/extreme-poverty/:rate` | Fetch conflicts by extreme poverty | Public |
| GET | `/conflicts/food-insecurity/:rate` | Fetch conflicts by food insecurity | Public |
| GET | `/conflicts/unemployment/:rate` | Fetch conflicts by unemployment | Public |
| GET | `/conflicts/youth-unemployment/:rate` | Fetch conflicts by youth unemployment | Public |
| GET | `/conflicts/sector/:sector` | Fetch conflicts by most affected sector | Public |
| GET | `/conflicts/black-market/:level` | Fetch conflicts by black market activity | Public |
| GET | `/conflicts/black-market-goods/:goods`| Fetch conflicts by black market goods | Public |
| GET | `/conflicts/profiteering/:status` | Fetch conflicts by profiteering status | Public |
| GET | `/conflicts/currency-gap/:gap` | Fetch conflicts by currency black market gap | Public |
| GET | `/conflicts/reconstruction-cost/:amt`| Fetch conflicts by reconstruction cost | Public |
| GET | `/conflicts/cost-of-war/:amt` | Fetch conflicts by war cost | Public |
| GET | `/conflicts/informal-economy/pre/:val`| Fetch pre-war informal economy size | Public |
| GET | `/conflicts/informal-economy/during/:val`| Fetch wartime informal economy size | Public |
| GET | `/conflicts/households/:count` | Fetch conflicts by households affected | Public |

### 3. Sub-Projections & Aggregations
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/conflicts/region/:region/latest`| Fetch latest regional conflict | Public |
| GET | `/conflicts/region/:region/oldest`| Fetch oldest regional conflict | Public |
| GET | `/conflicts/country/:country/history`| Fetch complete country conflict history | Public |
| GET | `/conflicts/type/:type/count` | Count conflicts of specific type | Public |
| GET | `/conflicts/status/:status/count` | Count conflicts of specific status | Public |
| GET | `/conflicts/year/:year` | Fetch conflicts active in specific year | Public |
| GET | `/conflicts/sector/:sector/highest-gdp-loss`| Fetch sector conflict with highest GDP loss | Public |
| GET | `/conflicts/sector/:sector/highest-inflation` | Fetch sector conflict with highest inflation | Public |
| GET | `/conflicts/war/:name/summary` | Fetch war details summary | Public |
| GET | `/conflicts/war/:name/economic-impact`| Project macroeconomics data fields | Public |
| GET | `/conflicts/war/:name/poverty-impact`| Project poverty and food fields | Public |
| GET | `/conflicts/war/:name/black-market`| Project informal economy details | Public |
| GET | `/conflicts/war/:name/reconstruction`| Project reconstruction cost and status | Public |
| GET | `/conflicts/war/:name/currency-crisis`| Project currency devaluation and gap | Public |
| GET | `/conflicts/war/:name/unemployment` | Project unemployment details | Public |

### 4. Query Parameter Lists (Paginated Static Lists)
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/conflicts/ongoing` | Paginate and sort ongoing conflicts | Public |
| GET | `/conflicts/resolved` | Paginate and sort resolved conflicts | Public |
| GET | `/conflicts/europe` | Paginate and sort Europe conflicts | Public |
| GET | `/conflicts/asia` | Paginate and sort Asia conflicts | Public |
| GET | `/conflicts/high-inflation` | Paginate and sort high inflation conflicts | Public |
| GET | `/conflicts/high-poverty` | Paginate and sort high poverty conflicts | Public |
| GET | `/conflicts/high-gdp-loss` | Paginate and sort high GDP loss conflicts | Public |
| GET | `/conflicts/black-market/high` | Paginate and sort high black market conflicts | Public |

### 5. Search APIs
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/search?keyword=...` | Regex-based keyword search (Name, country, region) | Public |
| GET | `/search/conflicts?country=...` | Search conflicts by country, region, type, status | Public |
| GET | `/search/economic?inflation=...` | Search conflicts by inflation, poverty, GDP change | Public |
| GET | `/search/sector?name=...` | Search conflicts by affected sector name | Public |
| GET | `/search/black-market?goods=...` | Search conflicts by black market goods keyword | Public |

### 6. Auxiliary Record CRUD (Admin Only)
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| POST | `/regions` | Create new region document | Admin-Only |
| POST | `/countries` | Create new country document | Admin-Only |
| POST | `/economic-records` | Create new economic record document | Admin-Only |
| POST | `/poverty-records` | Create new poverty record document | Admin-Only |
| POST | `/inflation-records` | Create new inflation record document | Admin-Only |
| POST | `/black-market-records` | Create new black market record document | Admin-Only |
| POST | `/war-cost-records` | Create new war cost record document | Admin-Only |
| POST | `/reconstruction-records`| Create new reconstruction record document | Admin-Only |
| POST | `/unemployment-records` | Create new unemployment record document | Admin-Only |
| PUT | `/countries/:id` | Replace country document by ID | Admin-Only |
| PUT | `/economic-records/:id` | Replace economic record document by ID | Admin-Only |
| PUT | `/reconstruction-records/:id`| Replace reconstruction record document by ID | Admin-Only |
| DELETE| `/regions/:id` | Delete region document by ID | Admin-Only |
| DELETE| `/countries/:id` | Delete country document by ID | Admin-Only |
| DELETE| `/economic-records/:id` | Delete economic record document by ID | Admin-Only |
| DELETE| `/poverty-records/:id` | Delete poverty record document by ID | Admin-Only |
| DELETE| `/black-market-records/:id`| Delete black market record document by ID | Admin-Only |
| DELETE| `/war-cost-records/:id` | Delete war cost record document by ID | Admin-Only |
| DELETE| `/reconstruction-records/:id`| Delete reconstruction record document by ID | Admin-Only |
| DELETE| `/inflation-records/:id` | Delete inflation record document by ID | Admin-Only |
| DELETE| `/unemployment-records/:id`| Delete unemployment record document by ID | Admin-Only |

### 7. Statistics & Dashboards
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/stats/total-conflicts` | Fetch total conflicts count | Public |
| GET | `/stats/ongoing-conflicts` | Fetch ongoing conflicts count | Public |
| GET | `/stats/resolved-conflicts` | Fetch resolved conflicts count | Public |
| GET | `/stats/highest-inflation` | Fetch conflict with highest inflation rate | Public |
| GET | `/stats/lowest-gdp` | Fetch conflict with lowest GDP change | Public |
| GET | `/stats/highest-poverty` | Fetch conflict with highest poverty rate | Public |
| GET | `/stats/highest-food-insecurity`| Fetch conflict with highest food insecurity | Public |
| GET | `/stats/highest-currency-gap` | Fetch conflict with highest currency black market gap | Public |
| GET | `/stats/highest-war-cost` | Fetch conflict with highest war cost | Public |
| GET | `/stats/highest-reconstruction-cost`| Fetch conflict with highest reconstruction cost | Public |
| GET | `/admin/dashboard` | Dashboard with user statistics and database averages | Admin-Only |

### 8. Authentication Routes
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login user and receive token | Public |
| POST | `/auth/logout` | Logout user session | Protect |
| POST | `/auth/forgot-password` | Request password reset token | Public |
| POST | `/auth/reset-password` | Execute password reset | Public |
| POST | `/auth/refresh-token` | Refresh active Bearer token | Public |
| GET | `/auth/me` | Fetch authenticated user profile | Protect |
| DELETE| `/auth/account` | Delete authenticated user account | Protect |

### 9. JWT Testing Routes
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| POST | `/jwt/generate-token` | Generate test JWT token | Public |
| POST | `/jwt/verify-token` | Verify test JWT token | Public |
| POST | `/jwt/refresh-token` | Refresh test JWT token | Public |
| GET | `/jwt/profile` | Access JWT protected profile | Protect |
| GET | `/jwt/dashboard` | Access JWT protected dashboard | Protect |
| GET | `/jwt/user` | Access user protected route | Protect |
| GET | `/jwt/admin` | Access admin protected route | Admin-Only |
| DELETE| `/jwt/logout` | Logout JWT session | Protect |

### 10. Administrative & User Protections
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/admin/conflicts` | Fetch conflicts list (admin rate-limit) | Admin-Only |
| POST | `/admin/conflicts` | Admin create conflict (admin rate-limit + validates) | Admin-Only |
| PATCH| `/admin/conflicts/:id` | Admin update conflict (admin rate-limit) | Admin-Only |
| DELETE| `/admin/conflicts/:id` | Admin delete conflict (admin rate-limit) | Admin-Only |
| GET | `/protected/conflicts` | Fetch conflicts list | Protect |
| POST | `/protected/conflicts` | Create protected conflict | Protect |
| DELETE| `/protected/conflicts/:id` | Delete protected conflict | Protect |

### 11. Advance Utilities
| Method | Endpoint | Description | Access |
|:---|:---|:---|:---|
| GET | `/conflicts/recent` | Fetch 5 most recent conflicts chronologically | Public |
| GET | `/conflicts/latest` | Fetch 5 latest conflicts created | Public |
| GET | `/conflicts/random` | Fetch a random conflict document | Public |
| GET | `/conflicts/trending` | Fetch trending conflicts (high cost + decline) | Public |
| GET | `/conflicts/high-risk` | Fetch conflicts matching high risk parameters | Public |
| GET | `/conflicts/economic-collapse`| Fetch conflicts matching collapse indicators | Public |
| GET | `/compare` | Side-by-side comparison of 2 conflicts | Public |
| GET | `/health` | Fetch uptime and server operational state | Public |
| GET | `/version` | Fetch current API version | Public |

---

## ⚡ Setup & Installation

### 1. Pre-requisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or Atlas cloud cluster)

### 2. Setup environment variables
Create a `.env` file in the root `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/warLens
JWT_SECRET=yoursupersecurecryptographicsignkeyhere
```

### 3. Install dependencies
```bash
npm install
```

### 4. Seed conflict data
Seed the MongoDB database using the local `war_economic_impact_dataset.json` file:
```bash
npm run seed
```

### 5. Start the development server
```bash
npm run dev
```

---

## 🧪 API Verification & Testing

1. **Import Collection**: Import the provided collection JSON file `docs/postman/war-lens-api.postman_collection.json` into Postman.
2. **Configure Environment Variables**: Set a global or environment variable `baseUrl` to `http://localhost:5000`.
3. **Register User**: Execute `Register User` in the `AUTHENTICATION` folder.
4. **Login**: Execute `Login User` in the `AUTHENTICATION` folder and copy the returned `token`.
5. **Set Bearer Token**: In your Postman environment, paste the token into the `token` variable. Alternatively, under collection options set Authorization type to **Bearer Token** and value to `{{token}}`.
6. **Verify Access**:
   - Try to call administrative routes (e.g. `GET /admin/dashboard`). A normal user will receive `403 Access denied, admin only`.
   - Upgrade the user's role to `"admin"` directly in MongoDB to test complete administrative access.
   - Spam login routes to trigger rate-limiting and verify `429 Too Many Requests` is returned successfully.

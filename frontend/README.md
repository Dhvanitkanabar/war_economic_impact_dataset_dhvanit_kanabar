# WarLens — Frontend

A React + Vite + Redux Toolkit frontend for the WarLens economic conflict analysis platform.

## Tech Stack

- **React 18** — UI
- **Vite** — Build tool
- **Redux Toolkit** — Auth state management
- **Axios** — HTTP client
- **React Router v6** — Routing
- **Tailwind CSS v3** — Styling

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Or create `.env` manually with:

```
VITE_API_BASE_URL=https://war-economic-impact-dataset-dhvanit.onrender.com/api
```

> **Note:** If `.env` is missing or `VITE_API_BASE_URL` is not set, the app falls back to the production URL automatically.

### 3. Run dev server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `https://war-economic-impact-dataset-dhvanit.onrender.com/api` |

---

## API Integration

All HTTP calls use `src/api/axiosInstance.js`, which:
- Attaches the `Authorization: Bearer <token>` header automatically from `localStorage`
- Has a 15-second timeout (for Render cold-start warmup)
- Logs errors in development mode

### Authentication — `src/services/authService.js`

| Function | Method | Endpoint |
|---|---|---|
| `registerUser(data)` | `POST` | `/auth/register` |
| `loginUser(credentials)` | `POST` | `/auth/login` |
| `getProfile()` | `GET` | `/auth/profile` |
| `forgotPassword(email)` | `POST` | `/auth/forgot-password` |
| `resetPassword(data)` | `POST` | `/auth/reset-password` |
| `refreshToken(token)` | `POST` | `/auth/refresh-token` |
| `logoutUser()` | `POST` | `/auth/logout` |
| `deleteAccount()` | `DELETE` | `/auth/delete-account` |

### Conflicts — `src/services/conflictService.js`

| Function | Method | Endpoint |
|---|---|---|
| `getConflicts(params)` | `GET` | `/conflicts` |
| `getConflictById(id)` | `GET` | `/conflicts/:id` |
| `createConflict(data)` | `POST` | `/conflicts` |
| `replaceConflict(id, data)` | `PUT` | `/conflicts/:id` |
| `updateConflict(id, data)` | `PATCH` | `/conflicts/:id` |
| `deleteConflict(id)` | `DELETE` | `/conflicts/:id` |

**`getConflicts` supports these query params:**

`page`, `limit`, `sort`, `region`, `status`, `conflictType`, `primaryCountry`, `mostAffectedSector`, `blackMarketActivityLevel`, `warProfiteeringDocumented`, `minInflation`, `maxInflation`, `minGDP`, `maxGDP`, `minWarCost`, `maxWarCost`, `minReconstructionCost`, `maxReconstructionCost`, `startYear`, `endYear`

### Search — `src/services/searchService.js`

| Function | Method | Endpoint |
|---|---|---|
| `searchConflicts(keyword)` | `GET` | `/conflicts/search?keyword=<value>` |

### Statistics — `src/services/statsService.js`

| Function | Method | Endpoint |
|---|---|---|
| `getStatsOverview()` | `GET` | `/conflicts/stats/overview` |
| `getHighestInflation()` | `GET` | `/conflicts/stats/highest-inflation` |
| `getLowestGDP()` | `GET` | `/conflicts/stats/lowest-gdp` |
| `getHighestWarCost()` | `GET` | `/conflicts/stats/highest-war-cost` |
| `getHighestReconstructionCost()` | `GET` | `/conflicts/stats/highest-reconstruction-cost` |

### Analytics — `src/services/analyticsService.js`

| Function | Method | Endpoint |
|---|---|---|
| `getRegionDistribution()` | `GET` | `/conflicts/analytics/region-distribution` |
| `getTypeDistribution()` | `GET` | `/conflicts/analytics/type-distribution` |
| `getWarCostByRegion()` | `GET` | `/conflicts/analytics/war-cost-by-region` |
| `getInflationByRegion()` | `GET` | `/conflicts/analytics/inflation-by-region` |
| `getSectorImpact()` | `GET` | `/conflicts/analytics/sector-impact` |

---

## API Test Page

Visit `/api-test` in the running app to interactively test all backend endpoints and verify connectivity.

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/conflicts` | Conflicts table |
| `/statistics` | Stats overview |
| `/analytics` | Analytics tabs |
| `/login` | Sign in |
| `/register` | Create account |
| `/api-test` | API connectivity test (developer tool) |

---

## Auth Flow

1. User submits login form → `POST /auth/login`
2. On success: token saved to `localStorage` as `token`, Redux `auth` state updated
3. Every subsequent request automatically includes `Authorization: Bearer <token>`
4. On logout: `localStorage` cleared, Redux state reset

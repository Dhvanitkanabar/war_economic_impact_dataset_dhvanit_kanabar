# Technical Architecture Documentation

This document describes the technical implementation details of the WarLens platform React frontend.

---

## 📂 Folder Structure

```bash
frontend/
├── src/
│   ├── api/          # Axios instance and response/request interceptors
│   ├── app/          # Redux Store configuration
│   ├── components/   # Reusable UI widgets and layout shells (Navbar, Footer, ErrorBoundary)
│   ├── features/     # Redux Slices (Auth state slice)
│   ├── pages/        # Router pages (Lazy loaded dashboard, analytics, CRUD panels)
│   ├── services/     # API request services (Auth, Conflicts, Search, Stats, Analytics)
│   ├── index.css     # Tailwind styling rules and Light/Dark overrides
│   ├── main.jsx      # React App DOM bootstrap
│   └── App.jsx       # Route guards, Suspense configs, and App main routes
├── .eslintrc.json    # ESLint configuration
└── .prettierrc       # Prettier code styling configuration
```

---

## 🔐 Authentication System

### Flow Architecture
1. **Forms Validation**: Managed through Formik and Yup on `/login` and `/register`.
2. **State Management**:
   - Redux Slices ([authSlice.js](file:///c:/Users/dhvan/Desktop/project_new/war_economic_impact_dataset_dhvanit_kanabar/frontend/src/features/auth/authSlice.js)) store:
     - `user`: Authenticated user metadata.
     - `token`: JWT credentials.
     - `isAuthenticated`: Validation boolean.
3. **Persisted Sessions**: Configurable via settings. Token is saved in `localStorage`.
4. **Guards**:
   - `ProtectedRoute`: Redirects guest users to `/login`.
   - `GuestRoute`: Redirects logged-in users back to `/dashboard`.
   - `AdminRoute`: Grants access to CRUD edits/replaces/deletions only if the user has an `admin` role.

---

## 🗄 CRUD Operations

Admin users can create, read, update, replace, and delete conflict records through standard layouts:
- **Create**: `/admin/conflicts/create` submits full payload to `POST /conflicts`.
- **Edit**: `/admin/conflicts/edit/:id` performs a partial `PATCH /conflicts/:id` request.
- **Replace**: `/admin/conflicts/replace/:id` does a complete `PUT /conflicts/:id` document replacement.
- **Delete**: Handled directly from the conflicts list view `/conflicts` via `DELETE /conflicts/:id`.

---

## 📈 Analytics & Charts Integration

The platform uses **Recharts** to render charts on `/analytics`:
- **Pie Charts**: Render distribution counts for regions, types, and active vs ended statuses. Legend lists and percentage labels are calculated dynamically.
- **Bar Charts**: Display war cost and reconstruction cost comparisons for top conflict zones, and GDP change vs inflation levels.
- **Line Charts**: Detail yearly counts and economic indicator trends over historical timelines.

### Computations & Rendering Optimization
Data parsing and grouping are wrapped in `useMemo` blocks:
```javascript
const statusPieData = useMemo(() => [
  { name: 'Active/Ongoing', value: activeConflicts },
  { name: 'Ended/Resolved', value: endedConflicts }
].filter(d => d.value > 0), [activeConflicts, endedConflicts]);
```

---

## 🔍 Search & Filtering

Advanced filtering and sorting parameters are supported:
- **Filtering**: Region, Type, Country, Status, Inflation Range, GDP change scale, Cost brackets, and timeline ranges.
- **Sorting**: Fields like GDP Change, Inflation Rate, War Cost, and Reconstruction Cost.
- **State Preservation**: Saves query configurations in `sessionStorage` (unless disabled in Settings) to preserve inputs during navigation.

---

## 🌗 Theme System

The theme configuration utilizes tailwind tokens and classic vanilla CSS variables in [index.css](file:///c:/Users/dhvan/Desktop/project_new/war_economic_impact_dataset_dhvanit_kanabar/frontend/src/index.css):
- **Dark Mode**: Applied by default. Uses dark background colors and border strokes.
- **Light Mode**: Applied by appending `body.light-theme` to the document body. Transitions are configured smoothly using:
  ```css
  transition-colors duration-300
  ```
- **Toggling**: Managed inside Settings through `localStorage` key overrides.

---

## 🔔 Notifications

User feedback is powered by `react-hot-toast` across all modules:
- **Success Toasts**:
  - Sign in successful
  - Account registered successfully
  - Conflict created / updated / replaced / deleted
  - Theme/Session settings saved
  - Profile updated
- **Warning Toasts**:
  - Shown prior to critical actions (e.g. permanent deletion warnings).
- **Error Toasts**:
  - Intercepted globally by axios to display human-friendly messages instead of raw trace dumps.

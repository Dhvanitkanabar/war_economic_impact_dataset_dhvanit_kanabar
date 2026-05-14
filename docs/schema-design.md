# Schema Design

> **Collection:** `conflicts`
> **Purpose:** Store and query all war economic impact records from the dataset.

---

## Field Type Mapping

The table below maps every dataset field to its planned MongoDB/Mongoose type. All raw dataset values arrive as strings — the schema must cast numeric fields explicitly.

### General / Identity Fields

| Dataset Field     | Mongoose Type | Notes                                          |
| :---------------- | :------------ | :--------------------------------------------- |
| `Conflict_Name`   | `String`      | Required; trimmed; indexed                     |
| `Conflict_Type`   | `String`      | Required; enum-restricted; indexed             |
| `Region`          | `String`      | Required; enum-restricted; indexed             |
| `Start_Year`      | `Number`      | Required; 4-digit year                         |
| `End_Year`        | `Number`      | Required; 4-digit year; may be projected       |
| `Status`          | `String`      | Required; enum-restricted; indexed             |
| `Primary_Country` | `String`      | Required; trimmed; indexed                     |

### Employment Impact Fields

| Dataset Field                          | Mongoose Type | Notes                                |
| :------------------------------------- | :------------ | :----------------------------------- |
| `Pre_War_Unemployment_%`               | `Number`      | Percentage; float                    |
| `During_War_Unemployment_%`            | `Number`      | Percentage; float                    |
| `Unemployment_Spike_Percentage_Points` | `Number`      | Derived diff value; float            |
| `Most_Affected_Sector`                 | `String`      | Enum-restricted sector name          |
| `Youth_Unemployment_Change_%`          | `Number`      | Percentage change; float             |

### Poverty Impact Fields

| Dataset Field                             | Mongoose Type | Notes                           |
| :---------------------------------------- | :------------ | :------------------------------ |
| `Pre_War_Poverty_Rate_%`                  | `Number`      | Percentage; float               |
| `During_War_Poverty_Rate_%`               | `Number`      | Percentage; float               |
| `Extreme_Poverty_Rate_%`                  | `Number`      | Percentage; float               |
| `Food_Insecurity_Rate_%`                  | `Number`      | Percentage; float               |
| `Households_Fallen_Into_Poverty_Estimate` | `Number`      | Integer count (whole households)|

### Economic Impact Fields

| Dataset Field                       | Mongoose Type | Notes                           |
| :---------------------------------- | :------------ | :------------------------------ |
| `GDP_Change_%`                      | `Number`      | Negative float (GDP decline)    |
| `Inflation_Rate_%`                  | `Number`      | Positive float                  |
| `Currency_Devaluation_%`            | `Number`      | Positive float                  |
| `Cost_of_War_USD`                   | `Number`      | Large integer; USD              |
| `Estimated_Reconstruction_Cost_USD` | `Number`      | Large integer; USD              |
| `Informal_Economy_Size_Pre_War_%`   | `Number`      | Percentage; float               |
| `Informal_Economy_Size_During_War_%`| `Number`      | Percentage; float; max ~90      |

### Black Market Impact Fields

| Dataset Field                      | Mongoose Type | Notes                                     |
| :--------------------------------- | :------------ | :---------------------------------------- |
| `Black_Market_Activity_Level`      | `String`      | Enum-restricted; 4 possible values        |
| `Primary_Black_Market_Goods`       | `String`      | Comma-separated list stored as String     |
| `Currency_Black_Market_Rate_Gap_%` | `Number`      | Float; gap between official & black rates |
| `War_Profiteering_Documented`      | `Boolean`     | Derived from "Yes"/"No" — cast to Boolean |

> [!NOTE]
> `War_Profiteering_Documented` is stored as `"Yes"` / `"No"` in the raw dataset. During ingestion it should be cast to a **Boolean** (`true` / `false`) for efficient querying and filtering.

---

## Validation Planning

### General / Identity Fields

#### `Conflict_Name`
- `type`: String
- `required`: true
- `trim`: true
- `minlength`: 2

#### `Conflict_Type`
- `type`: String
- `required`: true
- `enum`: see Enum Planning section
- `trim`: true

#### `Region`
- `type`: String
- `required`: true
- `enum`: see Enum Planning section
- `trim`: true

#### `Start_Year`
- `type`: Number
- `required`: true
- `min`: 1900
- `max`: 2100

#### `End_Year`
- `type`: Number
- `required`: true
- `min`: 1900
- `max`: 2200

#### `Status`
- `type`: String
- `required`: true
- `enum`: see Enum Planning section

#### `Primary_Country`
- `type`: String
- `required`: true
- `trim`: true
- `minlength`: 2

---

### Employment Fields

#### `Pre_War_Unemployment_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `During_War_Unemployment_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `Unemployment_Spike_Percentage_Points`
- `type`: Number
- `required`: true

#### `Most_Affected_Sector`
- `type`: String
- `required`: true
- `enum`: see Enum Planning section

#### `Youth_Unemployment_Change_%`
- `type`: Number
- `required`: true

---

### Poverty Fields

#### `Pre_War_Poverty_Rate_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `During_War_Poverty_Rate_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `Extreme_Poverty_Rate_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `Food_Insecurity_Rate_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `Households_Fallen_Into_Poverty_Estimate`
- `type`: Number
- `required`: true
- `min`: 0

---

### Economic Fields

#### `GDP_Change_%`
- `type`: Number
- `required`: true

#### `Inflation_Rate_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `Currency_Devaluation_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `Cost_of_War_USD`
- `type`: Number
- `required`: true
- `min`: 0

#### `Estimated_Reconstruction_Cost_USD`
- `type`: Number
- `required`: true
- `min`: 0

#### `Informal_Economy_Size_Pre_War_%`
- `type`: Number
- `required`: true
- `min`: 0
- `max`: 100

#### `Informal_Economy_Size_During_War_%`
- `type`: Number
- `required`: true
- `min`: 0
- `max`: 100

---

### Black Market Fields

#### `Black_Market_Activity_Level`
- `type`: String
- `required`: true
- `enum`: see Enum Planning section

#### `Primary_Black_Market_Goods`
- `type`: String
- `required`: true
- `trim`: true

#### `Currency_Black_Market_Rate_Gap_%`
- `type`: Number
- `required`: true
- `min`: 0

#### `War_Profiteering_Documented`
- `type`: Boolean
- `required`: true

---

## Enum Planning

### `Status`

```
Ongoing
Resolved
```

### `Conflict_Type`

```
World War
Civil War
Interstate War
Asymmetric War
Interstate/Counter-insurgency
```

### `Region`

```
East Asia
Europe
Middle East
Africa
South Asia
```

### `Most_Affected_Sector`

```
Agriculture
Construction
Energy
Manufacturing
Services
Tourism
```

### `Black_Market_Activity_Level`

```
Low
Moderate
High
Dominant
```

### `War_Profiteering_Documented` (Boolean mapping)

| Raw Dataset Value | Stored As |
| :---------------- | :-------- |
| `"Yes"`           | `true`    |
| `"No"`            | `false`   |

---

## Index Planning

Indexes should be created on the fields most commonly used for searching, filtering, and sorting. The following fields are planned for indexing:

| Field (camelCase in schema) | Dataset Field       | Index Type |
| :-------------------------- | :------------------ | :--------- |
| `conflictName`              | `Conflict_Name`     | Single     |
| `region`                    | `Region`            | Single     |
| `primaryCountry`            | `Primary_Country`   | Single     |
| `status`                    | `Status`            | Single     |
| `conflictType`              | `Conflict_Type`     | Single     |

### Why These Fields?

**`conflictName`**
- Most common lookup key. Users will search by name (e.g., "Russia-Ukraine War", "Iraq War").
- Supports: `GET /conflicts/name/:name`, keyword search, name sorting.

**`region`**
- Filters all conflicts within a geographic area (e.g., "Middle East", "Africa").
- Supports: `GET /conflicts/region/:region`, `GET /conflicts?region=Europe`, pagination by region.

**`primaryCountry`**
- Filters all records where a specific country is the primary affected nation.
- Supports: `GET /conflicts/country/:country`, `GET /conflicts?country=Ukraine`, country history lookups.

**`status`**
- The most frequent categorical filter — all "Ongoing" vs "Resolved" queries route through this field.
- Supports: `GET /conflicts/ongoing`, `GET /conflicts/resolved`, `GET /conflicts?status=Ongoing`, counting by status.

**`conflictType`**
- Filters by war category (Civil War, World War, etc.).
- Supports: `GET /conflicts/type/:type`, `GET /conflicts?type=Civil War`, counting by type.

### Benefits of These Indexes

| Benefit                    | Explanation                                                           |
| :------------------------- | :-------------------------------------------------------------------- |
| **Faster searching**       | MongoDB can use indexes to locate matching documents without a full collection scan |
| **Faster filtering**       | Query operators (`$eq`, `$in`) on indexed fields resolve in O(log n) time |
| **Faster sorting**         | Sorted queries on indexed fields avoid in-memory sort operations      |
| **Performance optimization** | Reduces CPU and RAM usage under high read load, especially for paginated endpoints |

> [!TIP]
> In future phases, consider a **compound index** on `{ conflictName: 1, primaryCountry: 1 }` to efficiently support queries that filter by both conflict and country simultaneously (e.g., `GET /conflicts/war/:name/economic-impact` for a specific country involvement).

---

## Future API Planning

The schema is designed to directly support a rich REST API surface. The field types, indexes, and enums chosen above make the following API patterns efficient and straightforward to implement.

### Filter by Status / Type / Region / Country

```
GET /conflicts?status=Ongoing
GET /conflicts?region=Europe
GET /conflicts?country=Ukraine
GET /conflicts?type=Civil War
```

**Schema support:**
- `status`, `region`, `primaryCountry`, `conflictType` are all indexed String fields with enum constraints.
- MongoDB `$eq` queries on these fields will use the planned indexes directly.

---

### Numeric Range Filters

```
GET /conflicts?inflationAbove=50
GET /conflicts?gdpLossAbove=30
GET /conflicts?povertyAbove=25
GET /conflicts?currencyGapAbove=100
GET /conflicts?warCostAbove=1000000000
GET /conflicts?minInflation=20&maxInflation=80
```

**Schema support:**
- All economic/poverty/employment fields are stored as `Number`, enabling efficient `$gte` / `$lte` queries.
- Example: `{ inflationRate: { $gte: 50 } }` or `{ inflationRate: { $gte: 20, $lte: 80 } }`.

---

### Sorting

```
GET /conflicts?sort=Inflation_Rate_%
GET /conflicts?sort=-GDP_Change_%
GET /conflicts?sort=Start_Year
GET /conflicts?sort=-Estimated_Reconstruction_Cost_USD
GET /conflicts?sort=Conflict_Name
```

**Schema support:**
- Number fields (inflation, GDP, reconstruction cost) support ascending and descending sort natively.
- `conflictName` index supports alphabetical sorting.
- Start/End Year stored as Number — enables chronological sorting.

---

### Pagination

```
GET /conflicts?page=1&limit=10
GET /conflicts?page=2&limit=20
GET /conflicts/ongoing?page=1&limit=5
GET /conflicts/resolved?page=2&limit=10
```

**Schema support:**
- Indexed fields allow filtered-then-paginated queries to skip full collection scans.
- Combination of `.skip()` and `.limit()` in Mongoose is efficient when a filter index is active.

---

### Combined Filter + Sort + Pagination

```
GET /conflicts?status=Ongoing&page=1&limit=10&sort=-Inflation_Rate_%
GET /conflicts?region=Europe&page=2&limit=5
GET /conflicts?country=Japan&sort=-GDP_Change_%
GET /conflicts?blackMarket=High&sort=-Currency_Black_Market_Rate_Gap_%
```

**Schema support:**
- The schema's combination of indexed string fields + numeric fields means multi-parameter queries execute efficiently.
- Enum constraints on `status`, `conflictType`, and `blackMarketActivityLevel` prevent invalid filter values from reaching the database.

---

### Keyword / Text Search

```
GET /conflicts?keyword=war
GET /conflicts?keyword=Japan
GET /search?keyword=World War
```

**Schema support:**
- A MongoDB **text index** can be added on `conflictName`, `primaryCountry`, and `region` in a future phase.
- Alternatively, regex-based search on the indexed `conflictName` field supports partial matches.

---

### Statistics Endpoints

```
GET /stats/total-conflicts
GET /stats/ongoing-conflicts
GET /stats/highest-inflation
GET /stats/lowest-gdp
GET /stats/highest-poverty
GET /stats/highest-war-cost
```

**Schema support:**
- All statistical aggregations (`$count`, `$max`, `$min`, `$avg`) operate on Number fields.
- `status` index speeds up counts by status.
- Number fields like `inflationRate`, `gdpChange`, `costOfWarUsd` support `$sort` + `$limit` for top-N queries.

---

### Conflict-Specific Sub-Resource Endpoints

```
GET /conflicts/war/:name/economic-impact
GET /conflicts/war/:name/poverty-impact
GET /conflicts/war/:name/black-market
GET /conflicts/war/:name/unemployment
GET /conflicts/war/:name/reconstruction
GET /conflicts/war/:name/currency-crisis
```

**Schema support:**
- Since all data lives in the `conflicts` collection under grouped field categories, sub-resource endpoints can use **MongoDB projections** to return only the relevant field group.
- Example: `economic-impact` endpoint projects `{ gdpChange, inflationRate, currencyDevaluation, costOfWarUsd, estimatedReconstructionCostUsd }`.
- This avoids the need for separate collections or joins.

---

### Comparison Endpoint

```
GET /compare?conflict1=WWII&conflict2=Ukraine
```

**Schema support:**
- Both conflicts are queried from the same `conflicts` collection using the indexed `conflictName` field.
- The API handler fetches both and returns a side-by-side comparison object.

---

> [!IMPORTANT]
> All field names in the MongoDB schema will follow **camelCase** naming convention (e.g., `conflictName`, `inflationRate`, `primaryCountry`) while the dataset uses underscore-separated names with special characters (e.g., `Conflict_Name`, `Inflation_Rate_%`). Field name normalization must be handled during data ingestion.

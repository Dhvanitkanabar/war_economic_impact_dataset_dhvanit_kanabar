# War Lens - REST API Endpoint Documentation

This document provides a detailed reference of the available API routes, request parameters, authorization headers, and response formats.

---

## Base URL
All API requests must be made to the following base endpoint:
`http://localhost:5000/api`

---

## AUTH APIs

### 1. Register User
- **Method**: `POST`
- **URL**: `/auth/register`
- **Purpose**: Creates a new user account with default role `"user"`.
- **Headers**: 
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "mysecretpassword"
}
```
- **Example Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "6a174471120fa0e65ea0bd90",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```
- **Example Error Response (`400 Bad Request`)**:
```json
{
  "success": false,
  "message": "Name, email and password are required"
}
```

### 2. Login User
- **Method**: `POST`
- **URL**: `/auth/login`
- **Purpose**: Verifies email & password and returns a JWT Bearer Token.
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "mysecretpassword"
}
```
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "6a174471120fa0e65ea0bd90",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```
- **Example Error Response (`401 Unauthorized`)**:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 3. Get Auth Profile
- **Method**: `GET`
- **URL**: `/auth/profile`
- **Purpose**: Fetches the logged-in user's profile details.
- **Headers**:
  - `Authorization: Bearer <your_jwt_token>`
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd90",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-05-28T01:00:00.000Z",
    "updatedAt": "2026-05-28T01:00:00.000Z"
  }
}
```
- **Example Error Response (`401 Unauthorized`)**:
```json
{
  "success": false,
  "message": "Not authorized, token missing"
}
```

---

## CONFLICT APIs

### 1. Get All Conflicts
- **Method**: `GET`
- **URL**: `/conflicts`
- **Purpose**: Retrieves all conflict records with pagination, sorting, and rich filtering options.
- **Query Parameters**:
  - `page`: Page number (default: `1`).
  - `limit`: Number of items per page (default: `10`).
  - `sort`: Sorting field, prefix with `-` for descending (e.g. `inflationRate`, `-warCostUsd`).
  - `region`: Filter by region (e.g. `East Asia`).
  - `status`: Filter by status (`Ongoing` or `Resolved`).
  - `conflictType`: Filter by class (e.g. `Interstate War`).
  - `minInflation` / `maxInflation`: Filter by inflation bounds.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Conflicts fetched successfully",
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1,
  "count": 1,
  "data": [
    {
      "_id": "6a174471120fa0e65ea0bd95",
      "conflictName": "Gulf War",
      "conflictType": "Interstate War",
      "region": "Middle East",
      "startYear": 1990,
      "endYear": 1991,
      "status": "Resolved",
      "primaryCountry": "Iraq",
      "gdpChange": -15.5,
      "inflationRate": 25.0,
      "warCostUsd": 61000000000,
      "reconstructionCostUsd": 80000000000
    }
  ]
}
```

### 2. Get Conflict By ID
- **Method**: `GET`
- **URL**: `/conflicts/:id`
- **Purpose**: Fetch details of a single conflict record by database ID.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Conflict fetched successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd95",
    "conflictName": "Gulf War",
    "conflictType": "Interstate War",
    "region": "Middle East",
    "startYear": 1990,
    "endYear": 1991,
    "status": "Resolved",
    "primaryCountry": "Iraq",
    "gdpChange": -15.5,
    "inflationRate": 25.0,
    "warCostUsd": 61000000000,
    "reconstructionCostUsd": 80000000000
  }
}
```
- **Example Error Response (`404 Not Found`)**:
```json
{
  "success": false,
  "message": "Conflict not found"
}
```

### 3. Create Conflict
- **Method**: `POST`
- **URL**: `/conflicts`
- **Purpose**: Create a new conflict document.
- **Headers**:
  - `Authorization: Bearer <admin_jwt_token>`
  - `Content-Type: application/json`
- **Request Body**:
```json
{
  "conflictName": "Korean War",
  "conflictType": "Interstate War",
  "region": "East Asia",
  "startYear": 1950,
  "endYear": 1953,
  "status": "Resolved",
  "primaryCountry": "South Korea",
  "gdpChange": -8.4,
  "inflationRate": 30.5,
  "warCostUsd": 34000000000,
  "reconstructionCostUsd": 60000000000
}
```
- **Example Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Conflict created successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd98",
    "conflictName": "Korean War",
    "conflictType": "Interstate War",
    "region": "East Asia",
    "startYear": 1950,
    "endYear": 1953,
    "status": "Resolved",
    "primaryCountry": "South Korea",
    "gdpChange": -8.4,
    "inflationRate": 30.5,
    "warCostUsd": 34000000000,
    "reconstructionCostUsd": 60000000000
  }
}
```
- **Example Error Response (`403 Forbidden`)**:
```json
{
  "success": false,
  "message": "Access denied, admin only"
}
```

### 4. Replace Conflict (PUT)
- **Method**: `PUT`
- **URL**: `/conflicts/:id`
- **Purpose**: Overwrite/replace an entire conflict record.
- **Headers**:
  - `Authorization: Bearer <admin_jwt_token>`
  - `Content-Type: application/json`
- **Request Body**: (requires all mandatory schema fields)
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Conflict replaced successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd98",
    "conflictName": "Korean War (Modified)",
    "conflictType": "Interstate War",
    "region": "East Asia",
    "startYear": 1950,
    "endYear": 1953,
    "status": "Resolved",
    "primaryCountry": "South Korea",
    "gdpChange": -9.0,
    "inflationRate": 31.0,
    "warCostUsd": 35000000000,
    "reconstructionCostUsd": 62000000000
  }
}
```

### 5. Update Conflict (PATCH)
- **Method**: `PATCH`
- **URL**: `/conflicts/:id`
- **Purpose**: Partially modify specific fields of a conflict record.
- **Headers**:
  - `Authorization: Bearer <admin_jwt_token>`
  - `Content-Type: application/json`
- **Request Body**: (pass only the fields to modify)
```json
{
  "status": "Ongoing"
}
```
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Conflict updated successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd98",
    "conflictName": "Korean War (Modified)",
    "conflictType": "Interstate War",
    "region": "East Asia",
    "startYear": 1950,
    "endYear": 1953,
    "status": "Ongoing",
    "primaryCountry": "South Korea",
    "gdpChange": -9.0,
    "inflationRate": 31.0,
    "warCostUsd": 35000000000,
    "reconstructionCostUsd": 62000000000
  }
}
```

### 6. Delete Conflict
- **Method**: `DELETE`
- **URL**: `/conflicts/:id`
- **Purpose**: Remove a conflict record from the database.
- **Headers**:
  - `Authorization: Bearer <admin_jwt_token>`
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Conflict deleted successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd98",
    "conflictName": "Korean War (Modified)"
  }
}
```

---

## SEARCH APIs

### 1. Search Conflicts
- **Method**: `GET`
- **URL**: `/conflicts/search?keyword=Japan`
- **Purpose**: Run regex full-text search query across conflict details.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Search results fetched successfully",
  "keyword": "Japan",
  "total": 1,
  "data": [
    {
      "_id": "6a174471120fa0e65ea0bd99",
      "conflictName": "World War II - Pacific Theatre",
      "conflictType": "World War",
      "region": "East Asia",
      "startYear": 1941,
      "endYear": 1945,
      "status": "Resolved",
      "primaryCountry": "Japan",
      "gdpChange": -35.2,
      "inflationRate": 150.0,
      "warCostUsd": 341000000000,
      "reconstructionCostUsd": 950000000000
    }
  ]
}
```

---

## STATISTICS APIs

### 1. Stats Overview
- **Method**: `GET`
- **URL**: `/conflicts/stats/overview`
- **Purpose**: Aggregates average stats (inflation, costs, poverty) for all entries.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Conflict statistics overview fetched successfully",
  "data": {
    "totalConflicts": 4,
    "ongoingConflicts": 1,
    "resolvedConflicts": 3,
    "totalWarCostUsd": 437000000000,
    "totalReconstructionCostUsd": 1092000000000,
    "averageInflationRate": 59.12,
    "averageGDPChange": -17.02,
    "averageUnemploymentSpike": 14.5,
    "averagePovertyRate": 38.2
  }
}
```

### 2. Highest Inflation
- **Method**: `GET`
- **URL**: `/conflicts/stats/highest-inflation`
- **Purpose**: Returns the conflict with the highest inflation rate.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Highest inflation conflict fetched successfully",
  "data": {
    "_id": "6a174471120fa0e65ea0bd99",
    "conflictName": "World War II - Pacific Theatre",
    "inflationRate": 150.0
  }
}
```

---

## ANALYTICS APIs

### 1. Region Distribution
- **Method**: `GET`
- **URL**: `/conflicts/analytics/region-distribution`
- **Purpose**: Returns groups and counts of conflicts by region.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Region distribution fetched successfully",
  "totalGroups": 2,
  "data": [
    { "region": "East Asia", "totalConflicts": 2 },
    { "region": "Middle East", "totalConflicts": 2 }
  ]
}
```

### 2. War Cost By Region
- **Method**: `GET`
- **URL**: `/conflicts/analytics/war-cost-by-region`
- **Purpose**: Aggregate regional statistics regarding total/average costs.
- **Example Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "War cost by region fetched successfully",
  "totalGroups": 2,
  "data": [
    {
      "region": "East Asia",
      "totalConflicts": 2,
      "totalWarCostUsd": 375000000000,
      "averageWarCostUsd": 187500000000.0
    }
  ]
}
```

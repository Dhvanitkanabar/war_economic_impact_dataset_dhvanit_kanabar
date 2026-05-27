# War Lens - Postman Integration & API Testing Guide

This document walks you through importing the API collection, setting environment variables, and establishing authentication flows to test the REST endpoints.

---

## 1. Import the Postman Collection
1. Launch **Postman**.
2. Click the **Import** button in the top-left corner.
3. Select **File** and upload the Postman collection JSON:
   `docs/postman/war-lens-api.postman_collection.json`
4. The **WarLens API** collection will appear in your left sidebar.

---

## 2. Set Up Environment Variables
We recommend setting up a Postman Environment rather than hardcoding addresses. 

Create a new environment (or set globals) with the following key-value pairs:
- **`baseUrl`**: `http://localhost:5000/api`
- **`token`**: Leave this blank initially (it will hold your JWT token).

---

## 3. The Authentication Flow
To access protected write operations, you must authenticate:

### Step A: Register a new user
1. Expand the **AUTH** folder in the collection.
2. Select the **Register** request.
3. In the **Body** tab, verify or modify the email and password:
   ```json
   {
     "name": "Jane Doe",
     "email": "jane@example.com",
     "password": "mysecurepassword"
   }
   ```
4. Click **Send**.
5. The API will respond with `201 Created` and returned data showing `role: "user"`.

### Step B: Login and Retrieve JWT
1. Select the **Login** request inside the **AUTH** folder.
2. Ensure the login email/password match your registration body.
3. Click **Send**.
4. In the response payload, copy the returned `"token"` string.

### Step C: Apply Bearer Token
1. In Postman, select the parent collection **WarLens API** (or edit the requests individually).
2. Go to the **Authorization** tab.
3. Select Type: **Bearer Token**.
4. Paste the copied token value or use the variable reference `{{token}}` (and paste your token under your Postman environment's `token` variable).
5. Ensure the child requests are set to **Inherit auth from parent**.

---

## 4. Testing Flow & Role Permissions

### Testing Public APIs
You can test any public API immediately without setting headers:
- **GET** `/api/conflicts`
- **GET** `/api/conflicts/:id`
- **GET** `/api/conflicts/search?keyword=Japan`
- **GET** `/api/conflicts/stats/overview`
- **GET** `/api/conflicts/analytics/region-distribution`

### Testing Write Operations (Admin-Only Restriction)
Attempts to modify records enforce strict authentication:

1. **Attempting modification without token**:
   - Call `POST /api/conflicts` with no token.
   - **Expected Status**: `401 Unauthorized`
   - **Expected Body**: `{"success": false, "message": "Not authorized, token missing"}`

2. **Attempting modification with normal user token**:
   - Log in as the user created above (role defaults to `"user"`).
   - Set the Bearer Token and call `POST /api/conflicts`.
   - **Expected Status**: `403 Forbidden`
   - **Expected Body**: `{"success": false, "message": "Access denied, admin only"}`

3. **Attempting modification as verified Admin**:
   - Connect to your local MongoDB using MongoDB Compass or terminal:
     ```bash
     mongosh
     use warLens
     db.users.updateOne({ email: "jane@example.com" }, { $set: { role: "admin" } })
     ```
   - Execute the **Login** request again in Postman to get a fresh token containing the administrative claim.
   - Update your Bearer token in Postman.
   - Call `POST`, `PUT`, `PATCH`, or `DELETE` requests.
   - **Expected Status**: `201 Created` / `200 OK`
   - **Result**: Record successfully created/modified!

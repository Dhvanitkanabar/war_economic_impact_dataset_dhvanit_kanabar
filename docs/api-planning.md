# API Planning

## Authentication Endpoints
- `POST /api/v1/auth/register`: User signup.
- `POST /api/v1/auth/login`: User login, returns JWT.
- `GET /api/v1/auth/me`: Get current user profile.

## Conflict Endpoints
- `GET /api/v1/conflicts`: Get all conflicts (with pagination, filtering, sorting).
- `GET /api/v1/conflicts/:id`: Get detailed single conflict record.
- `POST /api/v1/conflicts`: Create new record (Admin).
- `PUT /api/v1/conflicts/:id`: Update existing record (Admin).
- `DELETE /api/v1/conflicts/:id`: Delete record (Admin).

## Analytics Endpoints
- `GET /api/v1/analytics/overview`: Aggregated stats (total GDP loss, total cost).
- `GET /api/v1/analytics/regional`: Breakdowns by continent/region.
- `GET /api/v1/analytics/top-impacted`: Rankings of highest inflation/poverty.

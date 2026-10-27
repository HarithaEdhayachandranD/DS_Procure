# ProcureSense AI — API Reference

Base URL: `https://procuresense-backend.onrender.com/api`

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header.

```
Authorization: Bearer <jwt_token>
```

## Endpoints (to be documented)

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `GET  /suppliers`
- `POST /suppliers`
- `GET  /suppliers/:id`
- `GET  /procurement`
- `POST /procurement`
- `GET  /contracts`
- `GET  /analytics/spend`
- `GET  /analytics/risk`
- `POST /ml/predict/risk`
- `POST /ml/predict/demand`

# ProcureSense AI

**AI-Powered Procurement Intelligence & Supplier Decision Support Platform**

Enterprise-grade SaaS B2B platform that leverages machine learning to optimize procurement workflows, assess supplier risk, and deliver actionable intelligence for procurement teams.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        React + Vite                         │
│                    (Frontend — Render)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API
┌──────────────────────────▼──────────────────────────────────┐
│                   Node.js + Express                         │
│                   (Backend — Render)                        │
│                                                             │
│   ┌─────────────────┐         ┌──────────────────────────┐  │
│   │   PostgreSQL     │         │   FastAPI ML Service     │  │
│   │   (Render DB)    │         │   (Render — Python)      │  │
│   └─────────────────┘         └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Services

| Service      | Tech Stack                          | Port  | Deploy Target |
|-------------|-------------------------------------|-------|---------------|
| `frontend`  | React, Vite, Tailwind, shadcn/ui    | 5173  | Render Static |
| `backend`   | Node.js, Express, Prisma, PostgreSQL | 5000  | Render Web    |
| `ml-service`| FastAPI, Scikit-learn, Pandas        | 8000  | Render Web    |
| `database`  | PostgreSQL                           | 5432  | Render DB     |

---

## Project Structure

```
ProcureSense/
├── frontend/                   # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui base components
│   │   │   ├── layout/         # AppShell, Sidebar, Navbar
│   │   │   ├── charts/         # Recharts wrappers
│   │   │   └── shared/         # Reusable domain components
│   │   ├── pages/              # Route-level page components
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── suppliers/
│   │   │   ├── procurement/
│   │   │   ├── analytics/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # React context providers
│   │   ├── services/           # Axios API service layer
│   │   ├── utils/              # Utility functions
│   │   ├── constants/          # App-wide constants
│   │   └── types/              # JSDoc / shared type definitions
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── controllers/        # Route handler logic
│   │   ├── routes/             # Express route definitions
│   │   ├── middleware/         # Auth, error, validation middleware
│   │   ├── services/           # Business logic layer
│   │   ├── utils/              # Helpers (logger, response, etc.)
│   │   ├── config/             # DB, JWT, app config
│   │   └── validators/         # express-validator schemas
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.js             # Database seeder
│   ├── .env.example
│   └── package.json
│
├── ml-service/                 # FastAPI ML microservice
│   ├── app/
│   │   ├── core/               # Config, settings
│   │   ├── routers/            # FastAPI route handlers
│   │   ├── models/             # ML model loaders
│   │   ├── services/           # Prediction & training logic
│   │   ├── schemas/            # Pydantic request/response models
│   │   └── utils/              # Feature engineering helpers
│   ├── trained_models/         # Serialized .pkl / .joblib models
│   ├── notebooks/              # Jupyter notebooks for EDA & training
│   ├── main.py                 # FastAPI app entry point
│   ├── .env.example
│   └── requirements.txt
│
├── dataset/
│   ├── raw/                    # Original source data
│   ├── processed/              # Cleaned & feature-engineered data
│   └── exports/                # Report exports
│
├── docs/
│   ├── api/                    # API documentation
│   ├── architecture/           # Architecture diagrams
│   └── deployment/             # Deployment guides
│
├── render.yaml                 # Render multi-service deployment config
├── .gitignore
└── README.md
```

---

## Local Development Setup

### Prerequisites

- Node.js >= 20.x
- Python >= 3.11
- PostgreSQL >= 15
- npm >= 10.x

### 1. Clone & Install

```bash
git clone https://github.com/your-org/procuresense-ai.git
cd procuresense-ai
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### 3. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 4. ML Service

```bash
cd ml-service
cp .env.example .env
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## Deployment (Render)

This project uses a single `render.yaml` for Infrastructure-as-Code deployment.

1. Push to GitHub
2. Connect repo to [Render](https://render.com)
3. Render auto-detects `render.yaml` and provisions all services
4. Set any secret environment variables in the Render dashboard

---

## ML Capabilities

| Feature                    | Algorithm              | Status     |
|---------------------------|------------------------|------------|
| Supplier Risk Scoring      | Random Forest          | Planned    |
| Spend Anomaly Detection    | Isolation Forest       | Planned    |
| Demand Forecasting         | Gradient Boosting      | Planned    |
| Supplier Recommendation    | Collaborative Filtering| Planned    |
| Contract Risk Analysis     | Logistic Regression    | Planned    |

---

## License

Proprietary — ProcureSense AI © 2024. All rights reserved.

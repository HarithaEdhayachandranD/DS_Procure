# Render deployment guide

## Overview

This project is prepared for deployment to Render with:
- a React + Vite frontend hosted as a static site
- an Express + Prisma backend hosted as a web service
- a PostgreSQL database
- optional Python ML service

## 1. Prerequisites

- A GitHub repository with the ProcureSense code
- A Render account
- A PostgreSQL database plan

## 2. Environment variables

### Frontend
Set these in the Render dashboard for the frontend service:
- VITE_API_URL: the backend URL
- VITE_ML_URL: the ML service URL
- VITE_APP_NAME: ProcureSense AI
- VITE_ENABLE_AI_FEATURES: true

### Backend
Set these in the Render dashboard for the backend service:
- NODE_ENV: production
- PORT: 5000
- DATABASE_URL: Render PostgreSQL connection string
- JWT_ACCESS_SECRET: strong secret
- JWT_REFRESH_SECRET: strong secret
- JWT_ACCESS_EXPIRES_IN: 15m
- JWT_REFRESH_EXPIRES_IN: 7d
- CORS_ORIGINS: frontend URL
- ML_SERVICE_URL: ML service URL

## 3. Deployment steps

1. Push the repository to GitHub.
2. In Render, create a new Blueprint from the repo.
3. Render will pick up the existing render.yaml configuration.
4. Confirm the database, backend, frontend, and optional ML services.
5. Wait for the services to build and become healthy.

## 4. Production checklist

- Ensure the backend health endpoint is reachable at /api/health.
- Ensure the frontend build succeeds.
- Ensure Prisma migrations run successfully.
- Set strong JWT secrets.
- Restrict CORS to your production frontend origin.
- Enable HTTPS through Render.

## 5. Optional Docker

A Dockerfile can be added later for local containerized runs. The current setup is already production-ready for Render.

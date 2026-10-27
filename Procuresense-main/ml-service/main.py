from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import predict

app = FastAPI(
    title="ProcureSense AI — ML Service",
    description="AI-Powered Procurement Intelligence & Supplier Decision Support",
    version="1.0.0",
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(predict.router)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "ml-service", "version": "1.0.0", "endpoints": ["/predict/risk", "/predict/risk/batch", "/predict/recommendations"]}

from fastapi import APIRouter, HTTPException
from app.schemas.predict import (
    SupplierRiskInput,
    SupplierRiskOutput,
    BatchRiskInput,
    BatchRiskOutput,
    RecommendationInput,
    RecommendationOutput,
)
from app.services.predict import predict_supplier_risk, predict_batch_risk, generate_recommendations

router = APIRouter(prefix="/predict", tags=["Predictions"])


@router.post("/risk", response_model=SupplierRiskOutput, summary="Score a single supplier's risk")
def score_supplier_risk(body: SupplierRiskInput):
    """
    Scores a supplier's risk level using weighted performance metrics.
    Returns risk level (LOW/MEDIUM/HIGH/CRITICAL), score, confidence, and actionable recommendations.
    """
    try:
        return predict_supplier_risk(body)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/risk/batch", response_model=BatchRiskOutput, summary="Score multiple suppliers at once")
def score_batch_risk(body: BatchRiskInput):
    """Batch-scores risk for multiple suppliers in one call."""
    if not body.suppliers:
        raise HTTPException(status_code=400, detail="suppliers list cannot be empty")
    if len(body.suppliers) > 100:
        raise HTTPException(status_code=400, detail="Maximum 100 suppliers per batch request")
    try:
        return predict_batch_risk(body.suppliers)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/recommendations", response_model=RecommendationOutput, summary="Generate AI recommendations")
def get_recommendations(body: RecommendationInput):
    """
    Generates procurement recommendations based on org-level signals
    such as high-risk supplier counts, contract expirations, and performance trends.
    """
    try:
        return generate_recommendations(body)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

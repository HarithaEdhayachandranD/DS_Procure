from datetime import datetime
from typing import List

from app.schemas.predict import (
    SupplierRiskInput,
    SupplierRiskOutput,
    BatchRiskOutput,
    RecommendationInput,
    RecommendationItem,
    RecommendationOutput,
)


def _score_to_level(score: float) -> str:
    """Map a 0-100 risk score to a risk level label."""
    if score >= 75:
        return "CRITICAL"
    elif score >= 50:
        return "HIGH"
    elif score >= 25:
        return "MEDIUM"
    return "LOW"


def _explain(level: str, supplier_id: str) -> str:
    explanations = {
        "CRITICAL": f"Supplier {supplier_id} has very high risk indicators. Immediate review required.",
        "HIGH": f"Supplier {supplier_id} shows elevated risk. Close monitoring recommended.",
        "MEDIUM": f"Supplier {supplier_id} carries moderate risk. Standard monitoring advised.",
        "LOW": f"Supplier {supplier_id} demonstrates low risk. Performance is within acceptable range.",
    }
    return explanations.get(level, "Risk level assessed based on performance metrics.")


def _recommendations_for_level(level: str) -> List[str]:
    recs = {
        "CRITICAL": [
            "Immediately escalate to procurement leadership",
            "Source backup suppliers within 48 hours",
            "Conduct emergency supplier audit",
            "Review all active purchase orders with this supplier",
        ],
        "HIGH": [
            "Schedule supplier performance review meeting",
            "Identify and qualify at least one backup supplier",
            "Increase delivery monitoring frequency",
            "Review contract terms for penalty clauses",
        ],
        "MEDIUM": [
            "Schedule quarterly supplier review",
            "Monitor delivery performance closely",
            "Request supplier improvement plan if trend continues",
        ],
        "LOW": [
            "Maintain standard monitoring cadence",
            "Consider for preferred supplier status",
        ],
    }
    return recs.get(level, [])


def predict_supplier_risk(supplier: SupplierRiskInput) -> SupplierRiskOutput:
    """
    Rule-based supplier risk scoring.

    Weighted formula:
      - on_time_delivery_rate (30%): inverse — low OTD raises risk
      - quality_score (25%): inverse — low quality raises risk
      - response_time (20%): direct — high response time raises risk
      - performance_score (15%): inverse — low performance raises risk
      - existing risk_score (10%): direct passthrough
    """
    # Normalise inputs to 0-100 scale
    otd = max(0.0, min(100.0, float(supplier.on_time_delivery_rate or 0)))
    quality = max(0.0, min(100.0, float(supplier.quality_score or 0)))
    response = max(0.0, min(100.0, float(supplier.response_time or 0)))
    performance = max(0.0, min(100.0, float(supplier.performance_score or 0)))
    base_risk = max(0.0, min(100.0, float(supplier.risk_score or 0)))

    # Invert metrics where higher = better
    otd_risk = 100.0 - otd
    quality_risk = 100.0 - quality
    performance_risk = 100.0 - performance

    computed_risk = (
        otd_risk * 0.30
        + quality_risk * 0.25
        + response * 0.20
        + performance_risk * 0.15
        + base_risk * 0.10
    )

    # Round to 2 decimal places
    computed_risk = round(computed_risk, 2)
    confidence = round(0.75 + (0.20 * min(1.0, (otd + quality + performance) / 300)), 3)

    level = _score_to_level(computed_risk)

    return SupplierRiskOutput(
        supplier_id=supplier.supplier_id,
        risk_level=level,
        risk_score=computed_risk,
        confidence=confidence,
        explanation=_explain(level, supplier.supplier_id),
        recommendations=_recommendations_for_level(level),
    )


def predict_batch_risk(suppliers: List[SupplierRiskInput]) -> BatchRiskOutput:
    results = [predict_supplier_risk(s) for s in suppliers]
    return BatchRiskOutput(results=results, model_version="rule-based-v1.0")


def generate_recommendations(data: RecommendationInput) -> RecommendationOutput:
    recs = []

    if data.high_risk_count and data.high_risk_count > 0:
        recs.append(RecommendationItem(
            type="supplier-risk",
            title=f"Review {data.high_risk_count} high-risk supplier(s)",
            message=f"You have {data.high_risk_count} suppliers flagged as high or critical risk. Immediate review recommended.",
            priority="high",
            impact="High impact",
        ))

    if data.expiring_contracts and data.expiring_contracts > 0:
        recs.append(RecommendationItem(
            type="contract",
            title=f"Renew {data.expiring_contracts} expiring contract(s)",
            message=f"{data.expiring_contracts} contract(s) are expiring within 30 days. Begin renewal discussions now.",
            priority="high",
            impact="High impact",
        ))

    if data.avg_performance and data.avg_performance < 60:
        recs.append(RecommendationItem(
            type="performance",
            title="Supplier performance below threshold",
            message="Average supplier performance score is below 60%. Consider sourcing alternatives.",
            priority="medium",
            impact="Medium impact",
        ))

    if data.total_suppliers and data.total_suppliers > 0:
        concentration_ratio = (data.high_risk_count or 0) / data.total_suppliers
        if concentration_ratio > 0.3:
            recs.append(RecommendationItem(
                type="diversification",
                title="High supplier risk concentration",
                message=f"Over 30% of your suppliers are high-risk. Diversify your supplier base to reduce exposure.",
                priority="medium",
                impact="High impact",
            ))

    if not recs:
        recs.append(RecommendationItem(
            type="general",
            title="Portfolio looks healthy",
            message="No critical issues detected. Continue standard monitoring and quarterly reviews.",
            priority="low",
            impact="Low impact",
        ))

    return RecommendationOutput(
        recommendations=recs,
        generated_at=datetime.utcnow().isoformat(),
    )

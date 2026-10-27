from pydantic import BaseModel
from typing import Optional, List


class SupplierRiskInput(BaseModel):
    supplier_id: str
    risk_score: Optional[float] = 0.0
    on_time_delivery_rate: Optional[float] = 0.0
    quality_score: Optional[float] = 0.0
    response_time: Optional[float] = 0.0
    total_spend: Optional[float] = 0.0
    performance_score: Optional[float] = 0.0


class SupplierRiskOutput(BaseModel):
    supplier_id: str
    risk_level: str
    risk_score: float
    confidence: float
    explanation: str
    recommendations: List[str]


class BatchRiskInput(BaseModel):
    suppliers: List[SupplierRiskInput]


class BatchRiskOutput(BaseModel):
    results: List[SupplierRiskOutput]
    model_version: str


class RecommendationInput(BaseModel):
    organization_id: str
    high_risk_count: Optional[int] = 0
    total_suppliers: Optional[int] = 0
    avg_performance: Optional[float] = 0.0
    expiring_contracts: Optional[int] = 0


class RecommendationItem(BaseModel):
    type: str
    title: str
    message: str
    priority: str
    impact: str


class RecommendationOutput(BaseModel):
    recommendations: List[RecommendationItem]
    generated_at: str

"""Versioned API surface; health is liveness, not database readiness."""

from typing import Literal

from ninja import NinjaAPI, Schema


class HealthResponse(Schema):
    status: Literal["ok"]


api = NinjaAPI(title="Cuebik Core API", version="0.1.0")


@api.get("/health", response=HealthResponse, tags=["Operations"])
def health(request):
    """The API process is running; does not assert database availability."""
    return {"status": "ok"}

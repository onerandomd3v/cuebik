"""Tests for public liveness and the deliberately minimal API schema."""


def test_health_is_liveness_not_banking_data(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_versioned_openapi_includes_health(client):
    response = client.get("/api/v1/openapi.json")
    assert response.status_code == 200
    paths = response.json()["paths"]
    assert "/api/v1/health" in paths
    assert "get" in paths["/api/v1/health"]

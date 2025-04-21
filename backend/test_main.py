import pytest
from fastapi.testclient import TestClient
from main import app, grid_configurations, default_grid_configurations

# Create a test client
client = TestClient(app)

# Reset configurations before each test
@pytest.fixture(autouse=True)
def reset_configurations():
    grid_configurations.clear()
    grid_configurations.update(default_grid_configurations.copy())
    yield

# Tests for GET /api/configurations
def test_get_all_configurations():
    response = client.get("/api/configurations")
    assert response.status_code == 200
    assert "configurations" in response.json()
    assert len(response.json()["configurations"]) == len(default_grid_configurations)

# Tests for GET /api/configurations/{config_id}
def test_get_configuration_valid():
    # Test with valid config_id
    config_id = "numberheatmap"
    response = client.get(f"/api/configurations/{config_id}")
    assert response.status_code == 200
    assert response.json()["id"] == config_id

def test_get_configuration_invalid():
    # Test with invalid config_id
    response = client.get("/api/configurations/nonexistent")
    assert response.status_code == 404
    assert "Configuration not found" in response.json()["detail"]

# Tests for POST /api/configurations/{config_id}/update
def test_update_configuration_numberheatmap():
    config_id = "numberheatmap"
    updates = [
        {
            "field": "sales",
            "min": 100,
            "max": 2000
        }
    ]
    response = client.post(f"/api/configurations/{config_id}/update", json=updates)
    assert response.status_code == 200
    assert response.json()["configuration"]["columns"][2]["style"]["min"] == 100
    assert response.json()["configuration"]["columns"][2]["style"]["max"] == 2000

def test_update_configuration_rangeheatmap():
    config_id = "rangeheatmap"
    updates = [
        {
            "field": "cpu",
            "ranges": [
                {"min": 0, "max": 50, "style": {"color": "#008000"}},
                {"min": 51, "max": 80, "style": {"color": "#FFA500"}},
                {"min": 81, "max": 100, "style": {"color": "#FF0000"}}
            ]
        }
    ]
    
    response = client.post(f"/api/configurations/{config_id}/update", json=updates)
    assert response.status_code == 200
    assert response.json()["configuration"]["columns"][2]["style"]["ranges"][0]["max"] == 50
    assert response.json()["configuration"]["columns"][2]["style"]["ranges"][1]["min"] == 51

def test_update_configuration_invalid():
    response = client.post("/api/configurations/nonexistent/update", json=[])
    assert response.status_code == 404
    assert "Configuration not found" in response.json()["detail"]

# Tests for GET /api/data/{config_id}
def test_get_data_numberheatmap():
    response = client.get("/api/data/numberheatmap")
    assert response.status_code == 200
    assert "data" in response.json()
    assert len(response.json()["data"]) == 10
    assert "sales" in response.json()["data"][0]
    assert "revenue" in response.json()["data"][0]
    assert "profit" in response.json()["data"][0]

def test_get_data_timestamp():
    response = client.get("/api/data/timestamp")
    assert response.status_code == 200
    assert "data" in response.json()
    assert "task" in response.json()["data"][0]
    assert "age" in response.json()["data"][0]

def test_get_data_rangeheatmap():
    response = client.get("/api/data/rangeheatmap")
    assert response.status_code == 200
    assert "data" in response.json()
    assert "cpu" in response.json()["data"][0]
    assert "memory" in response.json()["data"][0]
    assert "status" in response.json()["data"][0]

def test_get_data_pagination():
    page = 2
    page_size = 5
    response = client.get(f"/api/data/numberheatmap?page={page}&page_size={page_size}")
    assert response.status_code == 200
    assert len(response.json()["data"]) == page_size
    assert response.json()["page"] == page
    assert response.json()["pageSize"] == page_size

def test_get_data_invalid_config():
    response = client.get("/api/data/nonexistent")
    assert response.status_code == 404
    assert "Configuration not found" in response.json()["detail"]
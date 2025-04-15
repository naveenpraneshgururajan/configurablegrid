from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/config")
def get_config():
    return {
        "columns": ["id", "name", "score", "timestamp"],
        "styles": {
            "heatmap": "score",
            "recentHighlight": "timestamp"
        }
    }

@app.get("/data")
def get_data():
    now = datetime.utcnow()
    return [
        {"id": 1, "name": "Alice", "score": 90, "timestamp": (now - timedelta(hours=2)).isoformat()},
        {"id": 2, "name": "Bob", "score": 60, "timestamp": (now - timedelta(days=1, hours=1)).isoformat()},
        {"id": 3, "name": "Charlie", "score": 30, "timestamp": (now - timedelta(minutes=10)).isoformat()},
    ]

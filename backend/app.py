from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime, timedelta
import random

app = FastAPI(title="Config API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Sample grid configurations
grid_configurations = {
    "numberheatmap": {
        "id": "numberheatmap",
        "title": "Sales Performance Heatmap",
        "columns": [
            {"field": "name", "header": "Product Name", "width": "25%"},
            {"field": "category", "header": "Category", "width": "15%"},
            {
                "field": "sales", 
                "header": "Sales (Units)", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 1000
                }
            },
            {
                "field": "revenue", 
                "header": "Revenue ($)", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 50000
                }
            },
            {
                "field": "profit", 
                "header": "Profit Margin (%)", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 100
                }
            },
            {"field": "lastUpdated", "header": "Last Updated", "width": "15%"}
        ]
    },
    "timestamp": {
        "id": "timestamp",
        "title": "Recent Activity Monitor",
        "columns": [
            {"field": "task", "header": "Task", "width": "25%"},
            {"field": "status", "header": "Status", "width": "15%"},
            {"field": "owner", "header": "Owner", "width": "15%"},
            {"field": "priority", "header": "Priority", "width": "15%"},
            {"field": "timestamp", "header": "Last Updated", "width": "15%"}
        ],
        "rowStyles": [
            {
                "condition": {
                    "type": "timestamp",
                    "field": "timestamp",
                    "operator": "<",
                    "value": "1day"
                },
                "style": {
                    "backgroundColor": "#f0fff0",
                    "fontWeight": "bold"
                }
            },
            {
                "condition": {
                    "type": "timestamp",
                    "field": "timestamp",
                    "operator": "<",
                    "value": "7days",
                    "and": {
                        "field": "timestamp",
                        "operator": ">=",
                        "value": "1day"
                    }
                },
                "style": {
                    "backgroundColor": "#f0f0ff"
                }
            }
        ]
    },
    "rangeheatmap": {
        "id": "rangeheatmap",
        "title": "Server Performance Dashboard",
        "columns": [
            {"field": "server", "header": "Server Name", "width": "20%"},
            {"field": "location", "header": "Location", "width": "15%"},
            {
                "field": "cpu", 
                "header": "CPU Usage (%)", 
                "width": "15%",
                "style": {
                    "type": "rangeheatmap",
                    "ranges": [
                        {"min": 0, "max": 60, "style": {"color": "#008000"}},
                        {"min": 60, "max": 85, "style": {"color": "#FFA500"}},
                        {"min": 85, "max": 100, "style": {"color": "#FF0000", "fontWeight": "bold"}}
                    ]
                }
            },
            {
                "field": "memory", 
                "header": "Memory Usage (%)", 
                "width": "15%",
                "style": {
                    "type": "rangeheatmap",
                    "ranges": [
                        {"min": 0, "max": 60, "style": {"color": "#008000"}},
                        {"min": 60, "max": 85, "style": {"color": "#FFA500"}},
                        {"min": 85, "max": 100, "style": {"color": "#FF0000", "fontWeight": "bold"}}
                    ]
                }
            },
            {"field": "status", "header": "Status", "width": "15%"},
            {"field": "lastChecked", "header": "Last Checked", "width": "20%"}
        ],
        "cellStyles": [
            {
                "field": "status",
                "conditions": [
                    {"value": "online", "style": {"backgroundColor": "#d4edda", "color": "#155724"}},
                    {"value": "warning", "style": {"backgroundColor": "#fff3cd", "color": "#856404"}},
                    {"value": "offline", "style": {"backgroundColor": "#f8d7da", "color": "#721c24"}}
                ]
            }
        ]
    }
}

# Sample data generators
def generate_salesnumber_data(count: int = 20):
    categories = ["Electronics", "Clothing", "Food", "Home", "Sports"]
    products = [
        "Laptop", "Smartphone", "T-shirt", "Jeans", "Apples", 
        "Bread", "Chair", "Table", "Basketball", "Tennis Racket"
    ]
    
    data = []
    for i in range(count):
        product = random.choice(products)
        category = random.choice(categories)
        sales = random.randint(50, 1000)
        price = random.randint(10, 500)
        revenue = sales * price
        profit = random.randint(5, 100)
        
        last_updated = (datetime.now() - timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d %H:%M:%S")
        
        data.append({
            "id": i + 1,
            "name": f"{product} {i+1}",
            "category": category,
            "sales": sales,
            "revenue": revenue,
            "profit": profit,
            "lastUpdated": last_updated
        })
    
    return data

def generate_tasktimestamp_data(count: int = 20):
    statuses = ["Completed", "In Progress", "Not Started", "Delayed"]
    owners = ["John", "Sarah", "Mike", "Emily", "David"]
    priorities = ["High", "Medium", "Low"]
    tasks = [
        "Update documentation", "Fix bug in login", "Review pull request",
        "Deploy to production", "Customer meeting", "Design new feature",
        "Code refactoring", "Performance testing", "Security audit"
    ]
    
    data = []
    for i in range(count):
        days_ago = random.choices([0, 1, 3, 7, 14, 30], [0.2, 0.2, 0.2, 0.2, 0.1, 0.1])[0]
        timestamp = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d %H:%M:%S")
        
        data.append({
            "id": i + 1,
            "task": random.choice(tasks),
            "status": random.choice(statuses),
            "owner": random.choice(owners),
            "priority": random.choice(priorities),
            "timestamp": timestamp
        })
    
    return data

def generate_serverrange_data(count: int = 20):
    locations = ["US-East", "US-West", "EU-Central", "Asia-Pacific", "South America"]
    statuses = ["online", "warning", "offline"]
    status_weights = [0.7, 0.2, 0.1]
    
    data = []
    for i in range(count):
        cpu = random.randint(10, 100)
        memory = random.randint(10, 100)
        status = random.choices(statuses, status_weights)[0]
        last_checked = (datetime.now() - timedelta(minutes=random.randint(1, 120))).strftime("%Y-%m-%d %H:%M:%S")
        
        data.append({
            "id": i + 1,
            "server": f"srv-{random.randint(1000, 9999)}",
            "location": random.choice(locations),
            "cpu": cpu,
            "memory": memory,
            "status": status,
            "lastChecked": last_checked
        })
    
    return data

# API endpoints
@app.get("/")
def read_root():
    return {"message": "Configurable Grid API is running"}

# @app.get("/api/configurations")
# def get_configurations():
#     return {"configurations": list(grid_configurations.values())}

@app.get("/api/configurations/{config_id}")
def get_configuration(config_id: str):
    if config_id not in grid_configurations:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return grid_configurations[config_id]

@app.get("/api/data/{config_id}")
def get_data(config_id: str, page: int = 1, page_size: int = 10):
    if config_id not in grid_configurations:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    # Generate appropriate data based on configuration type
    if config_id == "numberheatmap":
        all_data = generate_salesnumber_data(50)
    elif config_id == "timestamp":
        all_data = generate_tasktimestamp_data(50)
    elif config_id == "rangeheatmap":
        all_data = generate_serverrange_data(50)
    else:
        all_data = []
    
    # # Apply pagination
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    paginated_data = all_data[start_idx:end_idx]
    
    return {
        "data": paginated_data,
        "total": len(all_data),
        "page": page,
        "pageSize": page_size,
        "totalPages": (len(all_data) + page_size - 1) // page_size
    }

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)
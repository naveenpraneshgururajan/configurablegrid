from fastapi import FastAPI, HTTPException, Body
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
default_grid_configurations = {
    "numberheatmap": {
        "id": "numberheatmap",
        "title": "Sales Revenue Profit Heatmap (Displays inidividual Cell Colour based on Min-Max values)",
        "columns": [
            {"field": "name", "header": "Product", "width": "25%"},
            {"field": "category", "header": "Category", "width": "15%"},
            {
                "field": "sales", 
                "header": "Sales", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 1000
                }
            },
            {
                "field": "revenue", 
                "header": "Revenue $", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 50000
                }
            },
            {
                "field": "profit", 
                "header": "Profit %", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 100
                }
            },
        ]
    },
    "timestamp": {
        "id": "timestamp",
        "title": "Day based Heatmap ( Highlights the entier row based on Number of Days Column)",
        "columns": [
            {"field": "task", "header": "Task", "width": "25%"},
            {"field": "status", "header": "Status", "width": "15%"},
            {"field": "owner", "header": "Asigne", "width": "15%"},
            {"field": "priority", "header": "Priority", "width": "15%"},
            {
                "field": "age", 
                "header": "Number of Days", 
                "width": "15%",
                "style": {
                    "type": "numberheatmap",
                    "min": 0,
                    "max": 30,
                    "invertColor": 'true'  # This makes newer items green and older items red
                }
            },
        ]
    },
    "rangeheatmap": {
        "id": "rangeheatmap",
        "title": "Performance Dashboard (Highlights elements based on their values)",
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
                        {"min": 0, "max": 59, "style": {"color": "#008000"}},
                        {"min": 60, "max": 84, "style": {"color": "#FFA500"}},
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
                        {"min": 0, "max": 59, "style": {"color": "#008000"}},
                        {"min": 60, "max": 84, "style": {"color": "#FFA500"}},
                        {"min": 85, "max": 100, "style": {"color": "#FF0000", "fontWeight": "bold"}}
                    ]
                }
            },
            {"field": "status", "header": "Status", "width": "15%"},
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

# Store current configurations (start with defaults)
grid_configurations = default_grid_configurations.copy()

def generate_simpletimestamp_data(count: int = 20):
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
        # Generate a random age between 0 and 30 days
        days_ago = random.uniform(0, 30)
        # Round to 1 decimal place for display
        age_days = round(days_ago, 1)
        
        data.append({
            "id": i + 1,
            "task": random.choice(tasks),
            "status": random.choice(statuses),
            "owner": random.choice(owners),
            "priority": random.choice(priorities),
            "age": age_days,
        })
    
    return data


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
        price = random.randint(10, 150)
        revenue = sales * price
        profit = random.randint(5, 100)
        
        data.append({
            "id": i + 1,
            "name": f"{product}-{i+1}",
            "category": category,
            "sales": sales,
            "revenue": revenue,
            "profit": profit,
        })
    
    return data

def generate_serverrange_data(count: int = 20):
    locations = ["USA", "UK", "India", "Australia", "France","Sri Lanka","Singapore"]
    statuses = ["online", "warning", "offline"]
    status_weights = [0.7, 0.2, 0.1]
    
    data = []
    for i in range(count):
        cpu = random.randint(10, 99)
        memory = random.randint(10, 99)
        status = random.choices(statuses, status_weights)[0]
        
        data.append({
            "id": i + 1,
            "server": f"server-{random.randint(1000, 9999)}",
            "location": random.choice(locations),
            "cpu": cpu,
            "memory": memory,
            "status": status,
        })
    
    return data

# API endpoints
@app.get("/api/configurations")
def get_all_configurations():
    """Get all available configurations"""
    return {"configurations": list(grid_configurations.values())}

@app.get("/api/configurations/{config_id}")
def get_configuration(config_id: str):
    if config_id not in grid_configurations:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return grid_configurations[config_id]

@app.post("/api/configurations/{config_id}/update")
def update_configuration(config_id: str, updates = Body(...)):
    """Update specific fields in a configuration"""
    if config_id not in grid_configurations:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    config = grid_configurations[config_id]
    
    for update in updates:
        # Find the column with the matching field
        for column in config["columns"]:
            if column["field"] == update["field"] and "style" in column:
                style = column["style"]
                
                # Update numberheatmap style
                if style["type"] == "numberheatmap"  and update.get("min") is not None and update.get("max") is not None:
                    style["min"] = update["min"]
                    style["max"] = update["max"]
                
                # Update rangeheatmap style
                elif style["type"] == "rangeheatmap" and update.get("ranges"):
                    style["ranges"] = update["ranges"]
    
    return {"message": f"Configuration {config_id} has been updated", "configuration": config}

@app.get("/api/data/{config_id}")
def get_data(config_id: str, page: int = 1, page_size: int = 10):
    if config_id not in grid_configurations:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    # Generate appropriate data based on configuration type
    if config_id == "numberheatmap":
        all_data = generate_salesnumber_data(50)
    elif config_id == "rangeheatmap":
        all_data = generate_serverrange_data(50)
    elif config_id == "timestamp":
        all_data = generate_simpletimestamp_data(50)
    else:
        all_data = []
    
    # Apply pagination
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
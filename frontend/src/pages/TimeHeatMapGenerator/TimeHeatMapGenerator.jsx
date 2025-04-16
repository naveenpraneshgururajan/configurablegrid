// src/examples/SimplifiedTimeHeatMapGenerator.jsx
import React from "react";
import ConfigurableGrid from "../../components/ConfigurableGrid";

const TimeHeatMapGenerator = () => {
  return (
    <div className="example-container">
      <h2>Time Heatmap</h2>
      <p className="example-description">
        This example shows a simplified approach to coloring rows based on time.
        Items are colored along a gradient from green (newest) to red (oldest),
        making it easy to visually identify the most recent activities.
      </p>
      <div className="example-features">
        <h3>Features demonstrated:</h3>
        <ul>
          <li>Time-based gradient coloring using age of items</li>
          <li>Simple linear scale for time values</li>
          <li>Automatic calculation of "freshness" for timestamps</li>
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="timestamp" />
      </div>
      <div className="example-code">
        <h3>Example of How Config is returned from the API:</h3>
        <pre>
          {`{
  "id": "timestamp",
  "title": "Activity Timeline",
  "columns": [
    { "field": "task", "header": "Task", "width": "25%" },
    { "field": "status", "header": "Status", "width": "15%" },
    { "field": "owner", "header": "Owner", "width": "15%" },
    { "field": "priority", "header": "Priority", "width": "15%" },
    { 
      "field": "age", 
      "header": "Age (Days)", 
      "width": "15%",
      "style": {
        "type": "timestamp",
        "min": 0,
        "max": 30,
        "invertColor": true
      }
    },
    { "field": "timestamp", "header": "Last Updated", "width": "15%" }
  ]
}`}
        </pre>
      </div>
    </div>
  );
};

export default TimeHeatMapGenerator;

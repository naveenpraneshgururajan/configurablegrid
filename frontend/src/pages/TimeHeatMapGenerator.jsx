// src/examples/TimestampExample.jsx
import React from "react";
import ConfigurableGrid from "../components/ConfigurableGrid";

const TimeHeatMapGenerator = () => {
  return (
    <div className="example-container">
      <h2>Timestamp Example</h2>
      <p className="example-description">
        This example showcases how to style rows differently based on timestamp
        values. Recent items (less than 1 day old) are highlighted in green and
        made bold, while items between 1-7 days old have a light blue
        background.
      </p>
      <div className="example-features">
        <h3>Features demonstrated:</h3>
        <ul>
          <li>Time-based conditional row styling</li>
          <li>Multiple styling conditions with different visual treatments</li>
          <li>Complex conditions with 'and' operator</li>
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="timestamp" />
      </div>
      <div className="example-code">
        <h3>Configuration Example:</h3>
        <pre>
          {`{
  "id": "timestamp",
  "title": "Recent Activity Monitor",
  "columns": [
    { "field": "task", "header": "Task", "width": "25%" },
    { "field": "status", "header": "Status", "width": "15%" },
    { "field": "owner", "header": "Owner", "width": "15%" },
    { "field": "priority", "header": "Priority", "width": "15%" },
    { "field": "timestamp", "header": "Last Updated", "width": "15%" }
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
}`}
        </pre>
      </div>
    </div>
  );
};

export default TimeHeatMapGenerator;

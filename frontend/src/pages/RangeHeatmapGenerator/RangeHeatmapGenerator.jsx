// src/examples/RangeStyleExample.jsx
import React from "react";
import ConfigurableGrid from "../../components/ConfigurableGrid";

const RangeHeatmapGenerator = () => {
  return (
    <div className="example-container">
      <h2>Range Style Example</h2>
      <p className="example-description">
        This example demonstrates how to apply different styles to cells based
        on value ranges. CPU and Memory usage values are colored green, orange,
        or red based on their values. Additionally, the Status column uses
        value-based styling with different background colors.
      </p>
      <div className="example-features">
        <h3>Features demonstrated:</h3>
        <ul>
          <li>Range-based styling for numeric values</li>
          <li>Value-based cell styling for categorical data</li>
          <li>Combined styling techniques in a single grid</li>
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="rangeheatmap" />
      </div>
      <div className="example-code">
        <h3>Configuration Example:</h3>
        <pre>
          {`{
  "id": "rangeheatmap",
  "title": "Server Performance Dashboard",
  "columns": [
    { "field": "server", "header": "Server Name", "width": "20%" },
    { "field": "location", "header": "Location", "width": "15%" },
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
    ...
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
}`}
        </pre>
      </div>
    </div>
  );
};

export default RangeHeatmapGenerator;

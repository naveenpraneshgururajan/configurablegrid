import React from "react";
import ConfigurableGrid from "../../components/ConfigurableGrid";

const NumberHeatGenerator = () => {
  return (
    <div className="example-container">
      <h2>Heatmap Example</h2>
      <p className="example-description">
        This example demonstrates how to color cells as a heatmap based on their
        numeric values. Higher values appear with stronger colors. Look at the
        Sales, Revenue, and Profit columns to see the heatmap effect in action.
      </p>
      <div className="example-features">
        <h3>Features demonstrated:</h3>
        <ul>
          <li>Column-specific heatmap styling with different color ranges</li>
          <li>Color interpolation between min and max values</li>
          <li>Automatic value formatting based on column type</li>
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="numberheatmap" />
      </div>
      <div className="example-code">
        <h3>Example of How Config is returned from the API:</h3>
        <pre>
          {`{
  "id": "heatmap",
  "title": "Sales Performance Heatmap",
  "columns": [
    { "field": "name", "header": "Product Name", "width": "25%" },
    { "field": "category", "header": "Category", "width": "15%" },
    { 
      "field": "sales", "header": "Sales (Units)", "width": "15%",
      "style": {
        "type": "heatmap",
        "min": 0,
        "max": 1000,
        "minColor": "#ffffff",
        "maxColor": "#ff0000"
      }
    },
    ...
  ]
}`}
        </pre>
      </div>
    </div>
  );
};

export default NumberHeatGenerator;

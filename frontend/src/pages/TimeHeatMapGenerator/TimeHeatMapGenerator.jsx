// src/examples/SimplifiedTimeHeatMapGenerator.jsx
import React from "react";
import ConfigurableGrid from "../../components/ConfigurableGrid";
import { timeHeatmapLabels } from "../../constant/label";

const TimeHeatMapGenerator = () => {
  return (
    <div className="example-container">
      <h2>{timeHeatmapLabels.pageTitle}</h2>
      <p className="example-description">{timeHeatmapLabels.description}</p>
      <div className="example-features">
        <h3>{timeHeatmapLabels.featuresTitle}</h3>
        <ul>
          {timeHeatmapLabels.featuresListItems.map((data) => {
            return <li>{data}</li>;
          })}
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="timestamp" />
      </div>
      <div className="example-code">
        <h3>{timeHeatmapLabels.exampleTitle}</h3>
        <pre>{timeHeatmapLabels.responseFormat}</pre>
      </div>
    </div>
  );
};

export default TimeHeatMapGenerator;

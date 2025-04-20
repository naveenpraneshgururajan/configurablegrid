import React from "react";
import ConfigurableGrid from "../../components/ConfigurableGrid";
import { rangeHeatmapLabels } from "../../constant/label";

const RangeHeatmapGenerator = () => {
  return (
    <div className="example-container">
      <h2>{rangeHeatmapLabels.pageTitle}</h2>
      <p className="example-description">{rangeHeatmapLabels.description}</p>
      <div className="example-features">
        <h3>{rangeHeatmapLabels.featuresTitle}</h3>
        <ul>
          {rangeHeatmapLabels.featuresListItems.map((data, index) => {
            return <li key={index}>{data}</li>;
          })}
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="rangeheatmap" />
      </div>
      <div className="example-code">
        <h3>{rangeHeatmapLabels.exampleTitle}</h3>
        <pre>{rangeHeatmapLabels.responseFormat}</pre>
      </div>
    </div>
  );
};

export default RangeHeatmapGenerator;

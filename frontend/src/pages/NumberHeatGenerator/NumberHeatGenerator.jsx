import React from "react";
import ConfigurableGrid from "../../components/grid/ConfigurableGrid";
import { numberHeatmapLabels } from "../../constant/label";

const NumberHeatGenerator = () => {
  return (
    <div className="example-container">
      <h2>{numberHeatmapLabels.pageTitle}</h2>
      <p className="example-description">{numberHeatmapLabels.description}</p>
      <div className="example-features">
        <h3>{numberHeatmapLabels.featuresTitle}</h3>
        <ul>
          {numberHeatmapLabels.featuresListItems.map((data, index) => {
            return <li key={index}>{data}</li>;
          })}
        </ul>
      </div>
      <div className="grid-wrapper">
        <ConfigurableGrid configId="numberheatmap" />
      </div>
      <div className="example-code">
        <h3>{numberHeatmapLabels.exampleTitle}</h3>
        <pre>{numberHeatmapLabels.responseFormat}</pre>
      </div>
    </div>
  );
};

export default NumberHeatGenerator;

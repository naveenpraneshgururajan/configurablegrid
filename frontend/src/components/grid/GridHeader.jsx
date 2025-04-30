import React from "react";

const GridHeader = ({ column }) => {
  return (
    <th style={{ width: column.width || "auto" }} className={`grid-header`}>
      <div className="header-content">
        <span>{column.header}</span>
      </div>
    </th>
  );
};

export default GridHeader;

import React from "react";

const GridHeader = ({ column, sortConfig, onSort }) => {
  const isSorted = sortConfig.key === column.field;
  const sortDirection = isSorted ? sortConfig.direction : null;

  const handleSortClick = () => {
    onSort(column.field);
  };

  return (
    <th
      style={{ width: column.width || "auto" }}
      className={`grid-header ${isSorted ? "sorted" : ""}`}
      onClick={handleSortClick}
    >
      <div className="header-content">
        <span>{column.header}</span>
        {isSorted && (
          <span className="sort-indicator">
            {sortDirection === "asc" ? "▲" : "▼"}
          </span>
        )}
      </div>
    </th>
  );
};

export default GridHeader;

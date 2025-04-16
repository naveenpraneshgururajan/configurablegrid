// src/components/GridCell.jsx
import React from "react";
import {
  getHeatmapColor,
  getRangeStyle,
  getCellValueStyle,
} from "../utils/styleHelpers";
import { formatCellValue } from "../utils/formatters";

const GridCell = ({ value, column, row, cellStyles }) => {
  // Get the basic cell style from the column configuration
  const getCellStyle = () => {
    if (!column.style) return {};

    const { style } = column;

    switch (style.type) {
      case "numberheatmap":
        return {
          backgroundColor: getHeatmapColor(
            value,
            style.min,
            style.max,
            style.invertColor // Pass the invertColor option
          ),
        };
      case "rangeheatmap":
        return getRangeStyle(value, style.ranges);
      default:
        return {};
    }
  };

  // Get additional cell style from cell-specific styling config
  const getAdditionalCellStyle = () => {
    if (!cellStyles) return {};

    const cellStyle = cellStyles.find((cs) => cs.field === column.field);
    if (!cellStyle) return {};

    return getCellValueStyle(value, cellStyle.conditions);
  };

  // Combine all styles
  const combinedStyle = {
    ...getCellStyle(),
    ...getAdditionalCellStyle(),
  };

  // Format the cell value
  const formattedValue = formatCellValue(value, column.field);

  return <td style={combinedStyle}>{formattedValue}</td>;
};

export default GridCell;

// src/components/GridCell.jsx
import React from "react";
import PropTypes from "prop-types";
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
          backgroundColor: getHeatmapColor(value, style.min, style.max),
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

GridCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.shape({
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    width: PropTypes.string,
    style: PropTypes.object,
  }).isRequired,
  row: PropTypes.object.isRequired,
  cellStyles: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      conditions: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any,
          style: PropTypes.object.isRequired,
        })
      ).isRequired,
    })
  ),
};

GridCell.defaultProps = {
  cellStyles: [],
};

export default GridCell;

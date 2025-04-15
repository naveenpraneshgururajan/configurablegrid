// src/utils/formatters.js

/**
 * Formats cell values based on field type or name
 * @param {any} value - The cell value
 * @param {string} field - The field name
 * @returns {string} - Formatted value
 */
export const formatCellValue = (value, field) => {
  if (value === null || value === undefined) {
    return "—";
  }

  // Format based on field name patterns
  if (
    field.toLowerCase().includes("date") ||
    field.toLowerCase().includes("time") ||
    field.toLowerCase().includes("updated") ||
    field.toLowerCase().includes("created") ||
    field.toLowerCase().includes("checked")
  ) {
    // Try to format as date
    try {
      const date = new Date(value);
      if (!isNaN(date)) {
        return date.toLocaleString();
      }
    } catch (e) {
      // If date parsing fails, return as is
      return value;
    }
  }

  // Format numbers with commas for thousands
  if (typeof value === "number") {
    if (
      field.toLowerCase().includes("percent") ||
      field.toLowerCase().includes("profit")
    ) {
      return `${value.toLocaleString()}%`;
    }
    if (
      field.toLowerCase().includes("price") ||
      field.toLowerCase().includes("revenue")
    ) {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  }

  // Default - return as is
  return value;
};

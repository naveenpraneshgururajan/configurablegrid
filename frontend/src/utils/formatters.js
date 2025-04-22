export const formatCellValue = (value, field) => {
  if (value === null || value === undefined) {
    return "—";
  }

  // // Format based on field name patterns
  const lowerField = field.toLowerCase();

  // Format numbers with commas for thousands
  if (typeof value === "number") {
    if (lowerField.includes("percent") || lowerField.includes("profit")) {
      return `${value.toLocaleString("en-US")}%`;
    }
    if (lowerField.includes("price") || lowerField.includes("revenue")) {
      return `$${value.toLocaleString("en-US")}`;
    }
    return value.toLocaleString("en-US");
  }

  return value;
};

/**
 * Simple color interpolator using HSL (for clean gradients)
 * @param {number} value - Current value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {boolean} invertColor - Whether to invert the color scale
 * @returns {string} - HSL color string
 */
export const getHeatmapColor = (value, min, max, invertColor = false) => {
  const bounded = Math.max(min, Math.min(max, value));
  let percent = (bounded - min) / (max - min);

  // If invertColor is true, flip the percentage
  if (invertColor) {
    percent = 1 - percent;
  }

  // HSL from green (120) to red (0)
  const hue = percent * 120;

  return `hsl(${hue}, 100%, 50%)`;
};

/**
 * Gets style based on value ranges
 * @param {number} value - Value to check against ranges
 * @param {Array} ranges - Array of range objects with min, max, and style properties
 * @returns {Object} - Style object for the matching range
 */
export const getRangeStyle = (value, ranges) => {
  if (!ranges || !Array.isArray(ranges)) return {};

  for (const range of ranges) {
    if (value >= range.min && value < range.max) {
      return range.style;
    }
  }

  return {};
};

/**
 * Gets cell style based on value and conditions
 * @param {any} value - Cell value
 * @param {Array} conditions - Array of condition objects with value and style properties
 * @returns {Object} - Style object for the matching condition
 */
export const getCellValueStyle = (value, conditions) => {
  if (!conditions || !Array.isArray(conditions)) return {};

  const condition = conditions.find((c) => {
    // For string comparison, normalize both for case-insensitive comparison
    if (typeof value === "string" && typeof c.value === "string") {
      return value.toLowerCase() === c.value.toLowerCase();
    }
    return value === c.value;
  });

  return condition ? condition.style : {};
};

const API_BASE_URL = "http://localhost:8000/api";

/**
 * Fetch all grid configurations
 * @returns {Promise} - Resolves to array of configuration objects
 */
export const getAllConfigurations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/configurations`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all configurations:", error);
    throw error;
  }
};

/**
 * Update a grid configuration
 * @param {string} configId - Configuration ID
 * @param {Array} updates - Array of update objects
 * @returns {Promise} - Resolves to updated configuration
 */
export const updateConfiguration = async (configId, updates) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/configurations/${configId}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating configuration:", error);
    throw error;
  }
};

/**
 * Fetch a specific grid configuration
 * @param {string} configId - Configuration ID
 * @returns {Promise} - Resolves to configuration object
 */
export const getConfiguration = async (configId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/configurations/${configId}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching configuration:", error);
    throw error;
  }
};

/**
 * Fetch data for a grid
 * @param {string} configId - Configuration ID
 * @param {number} page - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise} - Resolves to data object with pagination info
 */
export const getGridData = async (configId, page = 1, pageSize = 10) => {
  try {
    const url = new URL(`${API_BASE_URL}/data/${configId}`);
    url.searchParams.append("page", page);
    url.searchParams.append("page_size", pageSize);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching grid data:", error);
    throw error;
  }
};

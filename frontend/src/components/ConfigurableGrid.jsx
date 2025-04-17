// src/components/ConfigurableGrid.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridHeader from "./GridHeader";
import GridCell from "./GridCell";
import { getConfiguration, getGridData } from "../services/api";
import { getHeatmapColor } from "../utils/styleHelpers";
import "./ConfigurableGrid.css";

const ConfigurableGrid = ({ configId }) => {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Fetch configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configData = await getConfiguration(configId);
        setConfig(configData);
      } catch (err) {
        setError(`Error loading configuration: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (configId) {
      fetchConfig();
    }
  }, [configId]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!config) return;
      setLoading(true);
      try {
        const result = await getGridData(
          configId,
          pagination.page,
          pagination.pageSize
        );
        if (!result || !result.data) {
          throw new Error("Invalid data response");
        }

        setData(result.data);
        setPagination({
          ...pagination,
          total: result.total,
          totalPages: result.totalPages,
        });
      } catch (err) {
        setError(`Error loading data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configId, pagination.page, pagination.pageSize]);

  // Handle sorting
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: field, direction });

    // Sort the data
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  const getRowStyle = (row, columns) => {
    const ageColumn = columns.find((col) => col.field === "age");
    if (
      !ageColumn ||
      !ageColumn.style ||
      ageColumn.style.type !== "numberheatmap"
    ) {
      return {};
    }

    const value = row["age"];
    const { min, max, invertColor } = ageColumn.style;

    return {
      backgroundColor: getHeatmapColor(value, min, max, invertColor),
    };
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  if (loading && !config) {
    return <div className="grid-loading">Loading configuration...</div>;
  }

  if (error) {
    return <div className="grid-error">{error}</div>;
  }

  if (!config) {
    return <div className="grid-error">No configuration found</div>;
  }

  return (
    <div className="configurable-grid">
      <h2 className="grid-title">{config.title}</h2>

      {loading ? (
        <div className="grid-loading">Loading data...</div>
      ) : (
        <>
          <div className="grid-table-container">
            <table className="grid-table">
              <thead>
                <tr>
                  {config.columns.map((column) => (
                    <GridHeader
                      key={column.field}
                      column={column}
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} style={getRowStyle(row, config.columns)}>
                    {config.columns.map((column) => (
                      <GridCell
                        key={`${row.id}-${column.field}`}
                        value={row[column.field]}
                        column={column}
                        row={row}
                        cellStyles={config.cellStyles}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid-pagination">
            <button
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === 1}
            >
              &laquo;
            </button>
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              &lt;
            </button>
            <span className="pagination-info">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              &gt;
            </button>
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              disabled={pagination.page === pagination.totalPages}
            >
              &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

ConfigurableGrid.propTypes = {
  configId: PropTypes.string.isRequired,
};

export default ConfigurableGrid;

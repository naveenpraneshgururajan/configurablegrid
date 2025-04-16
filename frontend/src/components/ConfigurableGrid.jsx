// src/components/ConfigurableGrid.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridHeader from "./GridHeader";
import GridCell from "./GridCell";
import { getConfiguration, getGridData } from "../services/api";
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
        console.error(err);
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
        setData(result.data);
        setPagination({
          ...pagination,
          total: result.total,
          totalPages: result.totalPages,
        });
      } catch (err) {
        setError(`Error loading data: ${err.message}`);
        console.error(err);
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

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  // Calculate row styles based on configuration
  const getRowStyle = (row) => {
    if (!config || !config.rowStyles) return {};

    for (const rowStyle of config.rowStyles) {
      if (evaluateRowCondition(row, rowStyle.condition)) {
        return rowStyle.style;
      }
    }

    return {};
  };

  // Evaluate row condition (including timestamp conditions)
  const evaluateRowCondition = (row, condition) => {
    if (!condition) return true;

    // Handle timestamp conditions
    if (condition.type === "timestamp") {
      const fieldValue = new Date(row[condition.field]);
      const now = new Date();

      let comparisonValue;
      switch (condition.value) {
        case "1day":
          comparisonValue = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7days":
          comparisonValue = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30days":
          comparisonValue = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          comparisonValue = new Date(condition.value);
      }

      switch (condition.operator) {
        case "<":
          if (!(fieldValue > comparisonValue)) return false;
          break;
        case "<=":
          if (!(fieldValue >= comparisonValue)) return false;
          break;
        case ">":
          if (!(fieldValue < comparisonValue)) return false;
          break;
        case ">=":
          if (!(fieldValue <= comparisonValue)) return false;
          break;
        case "=":
          if (!(fieldValue.getTime() === comparisonValue.getTime()))
            return false;
          break;
        default:
          return false;
      }

      // Check the 'and' condition if it exists
      if (condition.and) {
        return evaluateRowCondition(row, {
          ...condition.and,
          type: "timestamp",
        });
      }

      return true;
    }

    // Add other condition types here if needed

    return false;
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
                  <tr key={row.id} style={getRowStyle(row)}>
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

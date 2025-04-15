import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8000";

function App() {
  const [data, setData] = useState([]);
  const [config, setConfig] = useState({ columns: [], styles: {} });

  useEffect(() => {
    axios.get(`${API_URL}/config`).then((res) => setConfig(res.data));
    axios.get(`${API_URL}/data`).then((res) => setData(res.data));
  }, []);

  const isRecent = (timestamp) => {
    const now = new Date();
    const ts = new Date(timestamp);
    return (now - ts) / (1000 * 60 * 60) < 24;
  };

  const getRowStyle = (row) => {
    if (
      config.styles.recentHighlight &&
      isRecent(row[config.styles.recentHighlight])
    ) {
      return { backgroundColor: "#e6ffed" };
    } else {
      return { backgroundColor: "#ffe6e6" };
    }
  };

  const getCellStyle = (key, value) => {
    if (config.styles.heatmap === key) {
      const color = value > 75 ? "#ff9999" : value > 50 ? "#ffcc99" : "#ffffcc";
      return { backgroundColor: color };
    }
    return {};
  };

  return (
    <div className="App">
      <h2>Configurable Grid</h2>
      <table>
        <thead>
          <tr>
            {config.columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={getRowStyle(row)}>
              {config.columns.map((col) => (
                <td key={col} style={getCellStyle(col, row[col])}>
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

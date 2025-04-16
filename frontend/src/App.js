import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NumberHeatGenerator from "./pages/NumberHeatGenerator/NumberHeatGenerator";
import TimeHeatMapGenerator from "./pages/TimeHeatMapGenerator/TimeHeatMapGenerator";
import RangeHeatmapGenerator from "./pages/RangeHeatmapGenerator/RangeHeatmapGenerator";

function App() {
  // const [configurations, setConfigurations] = useState([]);
  // const [loading, setLoading] = useState(true);

  // // useEffect(() => {
  // //   const fetchConfigurations = async () => {
  // //     try {
  // //       const response = await fetch(
  // //         "http://localhost:5000/api/configurations"
  // //       );
  // //       const data = await response.json();
  // //       setConfigurations(data.configurations);
  // //     } catch (error) {
  // //       console.error("Error fetching configurations:", error);
  // //     } finally {
  // //       setLoading(false);
  // //     }
  // //   };

  // //   fetchConfigurations();
  // // }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>HeatMap Generator Project</h1>
          <nav className="app-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/numberheatmap">Number Heatmap</Link>
              </li>
              <li>
                <Link to="/timeheatmap">Time Heatmap</Link>
              </li>
              <li>
                <Link to="/rangeheatmap">Range Heatmap</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-container">
                  <h2>Heatmap Generator</h2>
                  <p>This generates display heatmap based on the the data .</p>
                  <div className="example-cards">
                    <div className="example-card">
                      <h3>Number Heatmap</h3>
                      <p>Displays heatmap based on numeric values.</p>
                      <Link to="/numberheatmap" className="btn">
                        View Heatmap
                      </Link>
                    </div>
                    <div className="example-card">
                      <h3> Time Heatmap </h3>
                      <p>Shows heatmap based on the Time</p>
                      <Link to="/timeheatmap" className="btn">
                        View Heatmap
                      </Link>
                    </div>
                    <div className="example-card">
                      <h3>Range Heatmap</h3>
                      <p>
                        Applies different styles to cells based on value ranges.
                      </p>
                      <Link to="/rangeheatmap" className="btn">
                        View Heatmap
                      </Link>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/numberheatmap" element={<NumberHeatGenerator />} />
            <Route path="/timeheatmap" element={<TimeHeatMapGenerator />} />
            <Route path="/rangeheatmap" element={<RangeHeatmapGenerator />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 Heatmap Generator</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

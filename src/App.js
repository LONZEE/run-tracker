import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [miles, setMiles] = useState("");
  const [pace, setPace] = useState("");
  const [time, setTime] = useState("");

  // Save to MongoDB
  const handleSaveToDatabase = async () => {
    const runData = { miles, pace, time };
    try {
      await axios.post("http://localhost:5001/api/runs", runData);
      alert("Data saved to MongoDB!");
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
    }
  };

  // Download as Excel
  const handleExportExcel = () => {
    const data = [{ miles, pace, time }];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Run Data");

    XLSX.writeFile(workbook, "run_data.xlsx");
  };

  // Download as CSV
  const handleExportCSV = () => {
    const data = [{ miles, pace, time }];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "run_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Run Tracker</h1>
      <form className="border p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Miles Ran:</label>
          <input
            type="number"
            className="form-control"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder="Enter miles"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pace (min/mile):</label>
          <input
            type="text"
            className="form-control"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            placeholder="Enter pace"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Time (hh:mm:ss):</label>
          <input
            type="text"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time"
          />
        </div>
      </form>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-primary" onClick={handleSaveToDatabase}>
          Save to Database
        </button>
        <button className="btn btn-success" onClick={handleExportExcel}>
          Download Excel
        </button>
        <button className="btn btn-warning" onClick={handleExportCSV}>
          Download CSV
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

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
    <div className="App">
      <h1>Run Tracker</h1>
      <form>
        <div>
          <label>Miles Ran:</label>
          <input
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder="Enter miles"
          />
        </div>

        <div>
          <label>Pace (min/mile):</label>
          <input
            type="text"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            placeholder="Enter pace"
          />
        </div>

        <div>
          <label>Total Time (hh:mm:ss):</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time"
          />
        </div>
      </form>

      <button onClick={handleSaveToDatabase}>Save to Database</button>
      <button onClick={handleExportExcel}>Download Excel</button>
      <button onClick={handleExportCSV}>Download CSV</button>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage({ user }) {
  const [miles, setMiles] = useState("");
  const [pace, setPace] = useState("");
  const [time, setTime] = useState("");
  const [heart, setHeart] = useState("");
  const [userData, setUserData] = useState([]);
  
  // Fetch all user data from MongoDB
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/runs/${user.username}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data from MongoDB:", error);
    }
  };
  
  // Save to MongoDB
  const handleSaveToDatabase = async () => {
    const runData = { user: user.username, miles, pace, time, heart };
    try {
      await axios.post("http://localhost:5001/api/runs", runData);
      alert("Data saved to MongoDB!");
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
    }
  };
  
  // Download as Excel
  const handleExportExcel = async () => {
    await fetchUserData();
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Run Data");
  
    XLSX.writeFile(workbook, "run_data.xlsx");
  };
  
  // Download as CSV
  const handleExportCSV = async () => {
    await fetchUserData();
    const worksheet = XLSX.utils.json_to_sheet(userData);
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
        <div className="form-group">
          <label htmlFor="miles">Miles</label>
          <input
            type="number"
            className="form-control"
            id="miles"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pace">Pace</label>
          <input
            type="text"
            className="form-control"
            id="pace"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="text"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="heart">Heart Rate</label>
          <input
            type="number"
            className="form-control"
            id="heart"
            value={heart}
            onChange={(e) => setHeart(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleSaveToDatabase}
        >
          Save to Database
        </button>
        <button
          type="button"
          className="btn btn-success mt-3 ml-2"
          onClick={handleExportExcel}
        >
          Export to Excel
        </button>
        <button
          type="button"
          className="btn btn-info mt-3 ml-2"
          onClick={handleExportCSV}
        >
          Export to CSV
        </button>
      </form>
    </div>
  );
}

export default Homepage;
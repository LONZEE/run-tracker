import React, { useState } from "react";
import axios from "axios";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/register", { username, password });
      if (response.data.success) {
        alert("Registration successful! Please log in.");
        onRegister();
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Register</h1>
      <form className="border p-4 rounded shadow-sm">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
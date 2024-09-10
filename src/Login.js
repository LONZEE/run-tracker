import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", { username, password });
      if (response.data.success) {
        onLogin(response.data.user);
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
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
            autoComplete="current-password"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-link mt-3"
          onClick={onShowRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
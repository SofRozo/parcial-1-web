// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import RobotList from "./components/RobotList";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: username, password }),
      });

      const data = await response.json();

      if (response.status === 200 && data.status === "success") {
        setIsAuthenticated(true);
        setError("");
        return true;
      } else {
        setError(data.message || "Credenciales incorrectas");
        return false;
      }
    } catch (error) {
      setError("Error de red o del servidor");
      return false;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/robots" replace />
              ) : (
                <LoginForm onLogin={handleLogin} error={error} />
              )
            }
          />
          <Route
            path="/robots"
            element={
              isAuthenticated ? (
                <RobotList />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

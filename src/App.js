// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IntlProvider } from "react-intl";
import esMessages from "./locales/es.json";
import enMessages from "./locales/en.json";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RobotList from "./components/RobotList";
import Footer from "./components/Footer";
import "./App.css";

const messages = {
  es: esMessages,
  en: enMessages,
};

function App() {
  const [locale, setLocale] = useState("es"); // español por defecto
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (username, password) => {
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
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <NavBar setLocale={setLocale} />
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
    </IntlProvider>
  );
}

export default App;

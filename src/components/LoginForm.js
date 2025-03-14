// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await onLogin(username, password);

    if (loginSuccess) {
      navigate('/robots');
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Adopta un Robot con Robot Lovers!</h1>

      <div className="banner-container">
        <img
          src="https://www.shutterstock.com/image-vector/set-cute-vintage-robots-banner-260nw-746786869.jpg"
          alt="robots"
          className="robot-banner"
        />
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Inicio de sesión</h2>

        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">Ingresar</button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => { setUsername(''); setPassword(''); }}
          >
            Cancelar
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

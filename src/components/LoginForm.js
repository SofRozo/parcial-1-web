import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import robotBanner from "../robot_ini.png";
import { FormattedMessage } from 'react-intl';

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
      <div className="banner-container">
        <img src={robotBanner} alt="robots" className="robot-banner" />
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">
          <FormattedMessage id="login.title" defaultMessage="Inicio de sesión" />
        </h2>

        <div className="form-group">
          <label>
            <FormattedMessage id="login.username" defaultMessage="Nombre de usuario" />
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="login.password" defaultMessage="Contraseña" />
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            <FormattedMessage id="login.button" defaultMessage="Ingresar" />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => { setUsername(''); setPassword(''); }}
          >
            <FormattedMessage id="login.cancel" defaultMessage="Cancelar" />
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

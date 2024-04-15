import React from 'react';
import '../Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    function sendLoginRequest(event) {
        navigate("/homePage");
    }

    return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" onClick={(event)=>sendLoginRequest(event)}>Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;

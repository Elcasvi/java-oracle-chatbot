import React from 'react';
import '../Login.css';
import HomePage from "./HomePage";

function Login() {
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
        <button type="submit">Iniciar Sesión</button>
      </form>
        <HomePage/>
    </div>
  );
}

export default Login;

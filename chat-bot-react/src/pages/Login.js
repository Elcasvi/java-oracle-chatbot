import React, { useState } from 'react';
import '../Login.css';
import { useNavigate } from "react-router-dom";
import userServices from '../services/userServices';

function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleEmailChange(event) {
      setEmail(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }

    const navigate = useNavigate();

    function sendLoginRequest(event) {
      event.preventDefault();
      const userService = new userServices();
      userService.login(email, password).then(exist => {
          //console.log(exist);
          if(exist){
            userService.getByEmail(email).then(data => {
              if(data.role === "MANAGER"){
                navigate('/homePageManager')
              }else if (data.role === "DEVELOPER"){
                navigate('/homePageDeveloper', { state: { email: email } });
              }else{
                console.error("No existe rol")
              }
            });
          }
      });
    }

    return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group ">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit" onClick={(event)=>sendLoginRequest(event)}>Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;

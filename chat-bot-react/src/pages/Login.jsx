import React, { useState } from 'react';
import '../Login.css'; // Asegúrate de que esta ruta sea correcta y esté apuntando al archivo CSS correcto
import { Button } from '@nextui-org/react';
import { useNavigate } from "react-router-dom";
import {UserIcon} from "../assets/icons/user_icon.tsx"
import userServices from '../services/userServices';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    const sendLoginRequest = (event) => {
        event.preventDefault();
        const userService = new userServices();
        userService.login(email, password).then(exist => {
            if (exist) {
                navigate(`/homePage/${encodeURIComponent(email)}`);
            } else {
                setError(true);  // Mostrar el mensaje de error
            }
        }).catch(error => {
            console.error("Error al iniciar sesión:", error);
            setError(true);  // Mostrar el mensaje de error en caso de excepción
        });
    }

    return (
        <div className="login-container p-6">
            <UserIcon></UserIcon>
            <h2 style={{ fontSize: '21px', fontWeight: 'bold' }}>Login</h2>
            <form className="login-form p-2">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div style={{ color: 'red', marginBottom: '10px',fontStyle: 'italic',fontSize: '15px' }}>Usuario o contraseña inválido</div>}
                <Button color="primary" type="submit" onClick={(event)=>sendLoginRequest(event)} >Iniciar Sesión</Button>
            </form>
        </div>
    );
}

export default Login;


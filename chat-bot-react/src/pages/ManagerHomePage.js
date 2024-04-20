import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css"
import React, { useEffect, useState } from 'react';
import { UserModel } from "../util/UserModel"; // Importa UserModel desde donde sea que esté ubicado
import userServices from "../services/userServices";

export default function ManagerHomePage() {

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const userService = new userServices();
        userService.getAll().then(setUsers).catch(console.error);
      }, []);
      

    return (
        <>
            <h1>Manager Home Page</h1>
            {users.map(user => (
                <DevCardManagerView key={user.id} user={user} />
            ))}
        </>
    );
};

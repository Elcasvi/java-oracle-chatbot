import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css"
import React from 'react';
import { UserModel } from "../util/UserModel"; // Importa UserModel desde donde sea que esté ubicado

export default function ManagerHomePage() {
    

    return (
        <>
            <h1>Manager Home Page</h1>
            {UserModel.map(user => (
                <DevCardManagerView key={user.id} user={user} />
            ))}
        </>
    );
};

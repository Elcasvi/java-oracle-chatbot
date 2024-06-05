import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css";
import React, { useState } from 'react';
import { UserModel } from "../util/UserModel";
import FilterDropdown from "../components/filterDropdown";

export default function ManagerHomePage() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Nombre (A-Z)', 'Nombre (Z-A)'];

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    // Función para ordenar los usuarios según la opción seleccionada
    const sortUsers = (option) => {
        switch (option) {
            case 'Nombre (A-Z)':
                return UserModel.slice().sort((a, b) => a.name.localeCompare(b.name));
            case 'Nombre (Z-A)':
                return UserModel.slice().sort((a, b) => b.name.localeCompare(a.name));
            default:
                return UserModel; // Por defecto, no se realiza ningún ordenamiento
        }
    };

    const sortedUsers = selectedOption ? sortUsers(selectedOption) : UserModel;

    return (
        <>
            <div className="home-page-container">
                <h2>Welcome ...</h2>
                <div>
                    <FilterDropdown options={options} onSelectOption={handleSelectOption} />
                </div>
            </div>
            {sortedUsers.map(user => (
                <DevCardManagerView key={user.id} user={user} />
            ))}
        </>
    );
};

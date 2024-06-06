import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css";
import React, { useState } from 'react';
import { UserModel } from "../util/UserModel";
import FilterDropdown from "../components/filterDropdown";
import BackButton from "../components/backButton";

export default function ManagerHomePage() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Nombre (A-Z)', 'Nombre (Z-A)'];

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

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
        <div>
        <BackButton text="Salir"/>
            <div className="home-page-container">
                <h2>Welcome ...</h2>
            </div>
            <FilterDropdown options={options} onSelectOption={handleSelectOption} />
            <DevCardManagerView users={sortedUsers} />
        </div>
    );
}

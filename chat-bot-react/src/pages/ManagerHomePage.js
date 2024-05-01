import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css";
import React, { useState, useEffect } from 'react';
import { UserModel } from "../util/UserModel";
import FilterDropdown from "../components/filterDropdown";
import userServices from "../services/userServices";

export default function ManagerHomePage() {
    
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const userService = new userServices();
        userService.getAll().then(setUsers).catch(console.error);
      }, []); 

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Nombre (A-Z)', 'Nombre (Z-A)'];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    // Función para ordenar los usuarios según la opción seleccionada
    const sortUsers = (option) => {
        switch (option) {
            case 'Nombre (A-Z)':
                return users.slice().sort((a, b) => a.name.localeCompare(b.name));
            case 'Nombre (Z-A)':
                return users.slice().sort((a, b) => b.name.localeCompare(a.name));
            default:
                return users; // Por defecto, no se realiza ningún ordenamiento
        }
    };

    const sortedUsers = selectedOption ? sortUsers(selectedOption) : users;

    return (
        <>
        <div className="manager-home-page">
            <h1>Manager Home Page</h1>
            <div className="icon-filter-container" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments-horizontal" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 6l8 0" />
                    <path d="M16 6l4 0" />
                    <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 12l2 0" />
                    <path d="M10 12l10 0" />
                    <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M4 18l11 0" />
                    <path d="M19 18l1 0" />
                </svg>
            </div>
            {isDropdownOpen && (
                <FilterDropdown options={options} onSelectOption={handleSelectOption} />
            )}
            {selectedOption && (
                <p>Seleccionaste la opción: {selectedOption}</p>
            )}
        </div>
        {sortedUsers.map(user => (
                <DevCardManagerView key={user.id} user={user} />
            ))}
        </>
    );
};
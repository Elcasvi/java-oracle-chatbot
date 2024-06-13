import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskCard from '../components/taskCard';
import FilterDropdown from '../components/filterDropdown';
import BackButton from '../components/backButton';
import userTasks from '../icons/user-tasks-icon.PNG';
import { Image } from '@nextui-org/react';
import userServices from '../services/userServices';
import LoadingSpinner from '../components/loadingSpinner';

function ManagerViewTaskDeveloper() {
    const { userId } = useParams();
    const [selectedUser, setSelectedUser] = useState();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{
        const userService = new userServices();
        userService.getUserById(userId).then(data=>{
            setSelectedUser(data.data)
        });
    },[userId])

    const options = ['Nombre (A-Z)', 'Nombre (Z-A)', 'Prioridad (Low-High)', 'Prioridad (High-Low)'];

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    if (!selectedUser) {
        return <LoadingSpinner />;
    }

    // Función para ordenar las tareas según la opción seleccionada
    const sortTasks = (tasks, option) => {
        switch (option) {
            case 'Nombre (A-Z)':
                return tasks.slice().sort((a, b) => a.name.localeCompare(b.name));
            case 'Nombre (Z-A)':
                return tasks.slice().sort((a, b) => b.name.localeCompare(a.name));
            case 'Prioridad (Low-High)':
                return tasks.slice().sort((a, b) => {
                    const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                });
            case 'Prioridad (High-Low)':
                return tasks.slice().sort((a, b) => {
                    const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                });
            default:
                return tasks; // Por defecto, no se realiza ningún ordenamiento
        }
    };

    // Filtrar y ordenar las tareas del usuario
    const filteredAndSortedTasks = selectedOption ? sortTasks(selectedUser.tasks, selectedOption) : selectedUser.tasks;

    return (
        <>  
            <Logout></Logout> 
            <BackButton/>     
          
            <div className="developer-information-container">
                <div className="developer-information">
                    <h1 className="developer-information-name">{selectedUser.name}</h1>
                    <p className="developer-information-email">Email: {selectedUser.email}</p>
                    <p className="developer-information-rol">Rol: {selectedUser.role}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FilterDropdown options={options} onSelectOption={handleSelectOption} />
                </div>
                <h2 className='tareas-asignadas-text'>Tareas Asignadas:</h2>
                <div className='task-info-container'>
                    <TaskCard tasks={filteredAndSortedTasks} />
                </div>
            </div>
        </>
    );
}

export default ManagerViewTaskDeveloper;

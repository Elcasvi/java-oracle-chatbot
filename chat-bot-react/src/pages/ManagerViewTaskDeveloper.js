import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '../util/UserModel';
import TaskCard from '../components/taskCard';
import FilterDropdown from '../components/filterDropdown';
import BackButton from '../components/backButton';

function ManagerViewTaskDeveloper() {
    const { userId } = useParams();

    // Buscar el usuario correspondiente en UserModel utilizando el userId
    const selectedUser = UserModel.find(user => user.id === parseInt(userId));
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Nombre (A-Z)', 'Nombre (Z-A)', 'Prioridad (Low-High)', 'Prioridad (High-Low)'];

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    if (!selectedUser) {
        return <div>User not found</div>;
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
    <BackButton/>     
        <div className="developer-information-container">
            <div className="developer-information">
                <h1 className="developer-information-name">{selectedUser.name}</h1>
                <p className="developer-information-email">Email: {selectedUser.email}</p>
                <p className="developer-information-rol">Rol: {selectedUser.role}</p>
            </div>
            <FilterDropdown options={options} onSelectOption={handleSelectOption} />
            <h2 className='tareas-asignadas-text'>Tareas Asignadas:</h2>
            <div className='task-info-container'>
                <TaskCard tasks={filteredAndSortedTasks} />
            </div>
        </div>
    </>
    );
}

export default ManagerViewTaskDeveloper;

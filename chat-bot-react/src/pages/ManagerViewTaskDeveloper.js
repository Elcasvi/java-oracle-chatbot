import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '../util/UserModel';
import TaskCard from '../components/taskCard';
import FilterDropdown from '../components/filterDropdown';
import taskServices from '../services/taskServices';

export default function ManagerViewTaskDeveloper() {
    const { userId } = useParams();

    const [ tasks, setTasks ] = useState([]);

    // Buscar el usuario correspondiente en UserModel utilizando el userId
    const selectedUser = tasks.find(user => user.id === parseInt(userId));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Nombre (A-Z)', 'Nombre (Z-A)', 'Prioridad (Low-High)', 'Prioridad (High-Low)'];

    useEffect(() => {
        const taskService = new taskServices();
        taskService.getall().then(setTasks).catch(console.error);
        console.log(tasks)
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
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
        <div>
            <div className='developer-information'>
                <h1>{selectedUser.name}</h1>
                <p>Email: {selectedUser.email}</p>
                <p>Rol: {selectedUser.role}</p>
            </div>
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
            <h2 className='tareas-asignadas-text'>Tareas Asignadas:</h2>
            <div className='task-info-container'>
                <TaskCard tasks={filteredAndSortedTasks} />
            </div>
        </div>
    );
}


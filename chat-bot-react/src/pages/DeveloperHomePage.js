import '../HomePage.css'
import React, { useState } from 'react';
import '../util/TaskModel'
import { Tasks } from '../util/TaskModel';
import AllTasks from '../components/AllTaskList';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

export default function DeveloperHomePage() {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTask = () => {
        closeModal();
    };

    return (
        <div className="home-page-container">
            <h1>Developer Home Page</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="custom-icon" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
            <AllTasks tasks={Tasks} />

            <div className='options-container'>
                 {/* Botón para abrir el modal */}
                 <button className="small-button" onClick={openModal}>Add New Task</button>
            </div>

           

            {/* Modal */}
            {isModalOpen && (
    <div className="modal">
        <div className="modal-content">
            {/* Botón para cerrar el modal */}
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Add New Task</h2>

            {/* Inputs para el nombre, descripción y prioridad de la tarea */}
            <div className="input-row">
                <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
            </div>

            {/* Select para la prioridad de la tarea */}
            <div className="input-row">
                <span>Priority:  </span>
                <select>
                    <option value="Pending">HIGH</option>
                    <option value="OnGoing">MEDIUM</option>
                    <option value="Done">LOW</option>
                </select>
            </div>

            {/* Botón para agregar la tarea */}
            <button className="add-button" onClick={handleAddTask}>Add</button>
        </div>
    </div>
)}

        </div>
    );
}


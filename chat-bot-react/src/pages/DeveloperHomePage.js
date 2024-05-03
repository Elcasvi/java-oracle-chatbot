import '../HomePage.css'
import React, { useState } from 'react';
import '../util/TaskModel';
import { Tasks } from '../util/TaskModel';
import AllTasks from '../components/AllTaskList';
import FilterDropdown from '../components/filterDropdown';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

export default function DeveloperHomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(Tasks); 
    const options = ['Filter by Status', 'Filter by Priority'];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTask = () => {
        closeModal();
    };

    const handleSelectOption = (option) => {
        if (option === 'Filter by Status') {
            const statusOrder = {
                'ONGOING': 3,
                'TODO': 2,
                'DONE': 1
            };
            const sortedTasks = Tasks.slice().sort((a, b) => {
                return statusOrder[b.status] - statusOrder[a.status];
            });
            setFilteredTasks(sortedTasks);
        } else if (option === 'Filter by Priority') {
            const priorityOrder = {
                'HIGH': 3,
                'MEDIUM': 2,
                'LOW': 1
            };
            const sortedTasks = Tasks.slice().sort((a, b) => {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
            setFilteredTasks(sortedTasks);
        }
        setIsDropdownOpen(false);
    };

    return (
        <div className="home-page-container">
            <h1>Developer Home Page</h1>
            <div className="icon-dropdown-container">
                <div className="icon-dropdown" onClick={toggleDropdown}>
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
                    {isDropdownOpen && (
                        <FilterDropdown options={options} onSelectOption={handleSelectOption} />
                    )}
                </div>
            </div>
            <AllTasks tasks={filteredTasks} /> 
            <div className='options-container'>
                <button className="small-button" onClick={openModal}>Add New Task</button>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Add New Task</h2>
                        <div className="input-row">
                            <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                            <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                        </div>
                        <div className="input-row">
                            <span>Priority:  </span>
                            <select>
                                <option value="HIGH">HIGH</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LOW">LOW</option>
                            </select>
                        </div>
                        <button className="add-button" onClick={handleAddTask}>Add</button>
                    </div>
                </div>
            )}
        </div>
    );
}

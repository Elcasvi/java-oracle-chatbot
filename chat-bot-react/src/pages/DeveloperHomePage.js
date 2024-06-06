import '../HomePage.css'
import React, { useState } from 'react';
import '../util/TaskModel';
import { Tasks } from '../util/TaskModel';
import AllTasks from '../components/AllTaskList';
import FilterDropdown from '../components/filterDropdown';
import { Select, SelectItem } from '@nextui-org/react';
import {animals} from "./data";
import OptionsBar from '../components/optionsBar';
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
        <div className="dev-home-page-container">
            <h1>Developer Home Page</h1>
            <OptionsBar></OptionsBar>
            <AllTasks tasks={filteredTasks} /> 
            
            
        </div>
    );
}

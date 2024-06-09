import '../HomePage.css'
import React, { useState } from 'react';
import '../util/TaskModel.js';
import { Tasks } from '../util/TaskModel.js';
import AllTasks from '../components/AllTaskList.jsx';
import {Button} from "@nextui-org/react";
import OptionsBar from '../components/optionsBar.jsx';import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {FilterIcon} from "../assets/icons/filter_icon.tsx";
//import {Select, SelectItem} from "@nextui-org/react";
import AddTaskModal from '../components/addTaskModal.jsx';


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
            <OptionsBar 
                options={options} 
                isDropdownOpen={isDropdownOpen} 
                toggleDropdown={toggleDropdown} 
                onSelectOption={handleSelectOption} 
                onOpenModal={openModal}
            />


            <AllTasks tasks={filteredTasks} /> 
            
            {isModalOpen && (
                <AddTaskModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddTask={handleAddTask}/>
            )}

            
        </div>
    );
}

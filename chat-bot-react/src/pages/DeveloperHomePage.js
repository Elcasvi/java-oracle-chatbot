import React, { useEffect, useState } from 'react';
import '../util/TaskModel';
import { Tasks } from '../util/TaskModel';
import AllTasks from '../components/AllTaskList';
import OptionsBar from '../components/optionsBar.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
import '../HomePage.css';
import taskServices from '../services/taskServices.js';
import userServices from '../services/userServices.js';

export default function DeveloperHomePage({ userId }) {
    const [filteredTasks, setFilteredTasks] = useState(null);

    const getAllTask = async () => {
        const userService = new userServices();
        const response = await userService.getUserById(userId);
        if (response && response.data){
            setFilteredTasks(response.data.tasks);
        } else {
            setFilteredTasks([]);
        }
    }

    useEffect(() => {
        if(userId) {
            getAllTask();
        }
    },[userId])

    const handleSelectOption = (option) => {
        if (option === 'Filter by Status') {
            const statusOrder = {
                'TODO': 3,
                'IN PROGRESS': 2,
                'DONE': 1
            };
            const sortedTasks = Tasks.slice().sort((a, b) => {
                return statusOrder[a.status] - statusOrder[b.status];
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
    };

    return (
        <div className="dev-home-page-container">
            <LogoutButton></LogoutButton>
            <h1 style={{ fontFamily: 'Lato, sans-serif', color: 'black', fontSize: '30px', textAlign: 'left' }}>
                    Welcome Back "El fuckin nombre aqui"
            </h1>            
            <OptionsBar onSelectOption={handleSelectOption} />
            {filteredTasks === null ? (
                <p>Cargando tareas...</p>
            ):(
                <AllTasks tasks={filteredTasks} />
            )} 
        </div>
    );
}


import React, { useEffect, useState } from 'react';
import '../util/TaskModel';
import AllTasks from '../components/AllTaskList';
import OptionsBar from '../components/optionsBar.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
import '../HomePage.css';
import userServices from '../services/userServices.js';
import LoadingSpinner from '../components/loadingSpinner.jsx';

export default function DeveloperHomePage({ userId }) {
    const [filteredTasks, setFilteredTasks] = useState(null);
    const [ nombre, setNombre ] = useState(null);
    const [ version, setVersion ] = useState(null);

    const getAllTask = async () => {
        const userService = new userServices();
        const response = await userService.getUserById(userId);
        const response2 = await userService.getVersion();
        if (response && response.data){
            setFilteredTasks(response.data.tasks)
            setNombre(response.data.name)
            setVersion(response2.data)
        } else {
            setFilteredTasks([]);
        }
    }

    useEffect(() => {
        if(userId) {
            getAllTask();
        }
    },[userId])

    const handleSuccess = () => {
        getAllTask();
    };

    const handleSelectOption = (option) => {
        if (option === 'Filter by Status') {
            const statusOrder = {
                'TODO': 3,
                'IN_PROGRESS': 2,
                'DONE': 1
            };
            const sortedTasks = filteredTasks.slice().sort((a, b) => {
                return statusOrder[a.state] - statusOrder[b.state];
            });
            setFilteredTasks(sortedTasks);
        } else if (option === 'Filter by Priority') {
            const priorityOrder = {
                'HIGH': 3,
                'MEDIUM': 2,
                'LOW': 1
            };
            const sortedTasks = filteredTasks.slice().sort((a, b) => {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
            setFilteredTasks(sortedTasks);
        }
    };

    return (
        <div className="dev-home-page-container">
            <LogoutButton></LogoutButton>
            <h1 style={{ fontFamily: 'Lato, sans-serif', color: 'black', fontSize: '30px', textAlign: 'left' }}>
                    Welcome Back {nombre}
            </h1>            
            <OptionsBar onCreateSuccess={handleSuccess} onSelectOption={handleSelectOption} userId={userId} />
            {filteredTasks === null ? (
                <LoadingSpinner />
            ):(
                <AllTasks tasks={filteredTasks} onUpdateSuccess={handleSuccess}/>
            )}
            <div className="version-container">Version: {version}</div>
        </div>
    );
}


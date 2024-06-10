import React, { useState } from 'react';
import '../util/TaskModel';
import { Tasks } from '../util/TaskModel';
import AllTasks from '../components/AllTaskList';
import OptionsBar from '../components/optionsBar.jsx';
import '../HomePage.css';

export default function DeveloperHomePage() {
    const [filteredTasks, setFilteredTasks] = useState(Tasks);

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
            <h1 style={{ fontFamily: 'Arial, sans-serif', color: 'black', fontSize: '2rem', textAlign: 'left' }}>
                    Welcome Back "El fuckin nombre aqui"
            </h1>            
            <OptionsBar onSelectOption={handleSelectOption} />
            <AllTasks tasks={filteredTasks} /> 
        </div>
    );
}


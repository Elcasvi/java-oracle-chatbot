import React, { useState } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import { EditIcon } from "../assets/icons/edit_icon.tsx";


import '../HomePage.css'

const animals = [
    {key: "low", label: "Low"},
    {key: "med", label: "Medium"},
    {key: "high", label: "High"},
    
  ];

function AllTasks({ tasks }) {

    const [taskList, setTaskList] = useState(tasks);

    const handleChangeStatus = (taskId, newStatus) => {
        const updatedTasks = taskList.map(task => {
            if (task.id === taskId) {
                return { ...task, state: newStatus };
            }
            return task;
        });
        setTaskList(updatedTasks);
    };

    const getCircleColor = (state) => {
        switch (state) {
            case 'DONE':
                return 'green';
            case 'IN PROGRESS':
                return 'yellow';
            case 'TODO':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <div className="tasks-container">
            <h3>Your Tasks:</h3>
            {tasks.map(task => (
                <article className='dev-card-manager' key={task.id}>
                    <header className="dev-card-manger-header">
                        <div
                            className="dev-card-manger-icon"
                            style={{
                                backgroundColor: getCircleColor(task.state)
                            }}
                        >
                            {/* Mostrar el círculo con el color adecuado */}
                        </div>
                        <div className="dev-card-manager-name">
                            <strong>{task.name}</strong><br />
                            <span className="dev-card-manager-numTask">Description: {task.description}</span>
                            <span className="dev-card-manager-numTask">State: {task.state}</span>    
                            <span className="dev-card-manager-numTask">Priority: {task.priority}</span>
                            <span className="dev-card-manager-numTask">Last Updated: {task.lastUpdated}</span>
                            <EditIcon />
                            
                            
                        </div>

                        {/* Dropdown para seleccionar el estado de la tarea */}
                        <div className="status-dropdown">
                            <div className="status-label">
                                <h3>Status: </h3>
                            </div>
                            <div className="status-select">
                                <Select
                                items={animals}
                                size='sm'
                                placeholder="Status"
                            
                                >
                                {(animal) => <SelectItem>{animal.label}</SelectItem>}
                                </Select>
                            </div>
                            <div className="status-label">
                                <h3>Priority: </h3>
                            </div>
                            <div className="status-select">
                            <Select
                                items={animals}
                                size='sm'
                                placeholder="Priority"
                            
                                >
                                {(animal) => <SelectItem>{animal.label}</SelectItem>}
                                </Select>
                            </div>
                                                </div>
                                                
                                            </header>
                                        </article>
                                    ))}
                                </div>
                            );
                        }

export default AllTasks;

import React, { useState } from 'react';
import '../HomePage.css'
import taskServices from '../services/taskServices';

const taskService = new taskServices();

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

    const updateTaskStatus = async (taskId, e) => {
        const taskStatus = e;
        const taskToUpdate = tasks.find(task => task.id === taskId);
        taskToUpdate.state = taskStatus

        const respuesta = await taskService.update(taskToUpdate,taskId);
    } 

    const updateTaskPriority = async (taskId,e) => {
        const taskPriority = e
        const taskToUpdate = tasks.find(task => task.id === taskId);

        taskToUpdate.priority = taskPriority
        const respuesta = await taskService.update(taskToUpdate,taskId);
    }

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
                            
                            
                        </div>

                        {/* Dropdown para seleccionar el estado de la tarea */}
                        <div className="status-dropdown">
                            <div className="status-label">
                                <h3>Status: </h3>
                            </div>
                            <div className="status-select">
                            <select value={task.state} onChange={(e) => updateTaskStatus(task.id, e.target.value)}>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
                            </div>
                            <div className="status-label">
                                <h3>Priority: </h3>
                            </div>
                            <div className="status-select">
                            <select value={task.priority} onChange={(e) => updateTaskPriority(task.id, e.target.value)}>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                            </div>
                                                </div>
                                                
                                            </header>
                                        </article>
                                    ))}
                                </div>
                            );
}

export default AllTasks;
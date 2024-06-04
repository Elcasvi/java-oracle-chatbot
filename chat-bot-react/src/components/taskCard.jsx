import React, { useState } from 'react';
import TaskModal from './taskModal'; // Importar el componente TaskModal


function TaskCard({ tasks }) {
    const [selectedTask, setSelectedTask] = useState(null); // Estado para la tarea seleccionada

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

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    return (
        <div className="dev-card-container">
            {tasks && tasks.map(task => ( // Verificar que tasks no sea undefined antes de mapearlo
                <div className='dev-card' key={task.id}>
                    <div className="dev-card-header">
                        <div
                            className="dev-card-icon"
                            style={{
                                backgroundColor: getCircleColor(task.state)
                            }}
                            onClick={() => handleTaskClick(task)} // Manejador de clic para mostrar el modal
                        />
                        <div className="dev-card-info">
                            <strong>{task.name}</strong>
                            <span className="dev-card-numTask">Priority Task: {task.priority}</span>
                        </div>
                    </div>
                    <button className="dev-card-showMore" onClick={() => handleTaskClick(task)}>Ver Más</button>
                </div>
            ))}
            {/* Integrar el componente TaskModal */}
            <TaskModal task={selectedTask} closeModal={closeModal} />
        </div>
    );
}

export default TaskCard;

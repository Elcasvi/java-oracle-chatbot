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
        <div>
            {tasks && tasks.map(task => ( // Verificar que tasks no sea undefined antes de mapearlo
                <article className='dev-card-manager' key={task.id}>
                    <header className="dev-card-manger-header">
                        <div
                            className="dev-card-manger-icon"
                            style={{
                                backgroundColor: getCircleColor(task.state)
                            }}
                            onClick={() => handleTaskClick(task)} // Manejador de clic para mostrar el modal
                        >
                            {/* Mostrar el círculo con el color adecuado */}
                        </div>
                        <div className="dev-card-manager-name">
                            <strong>{task.name}</strong>
                            <span className="dev-card-manager-numTask">Priority Task: {task.priority}</span>
                        </div>
                    </header>

                    <div className='dev-card-manager-button'>
                        <button className="dev-card-manager-showMore" onClick={() => handleTaskClick(task)}>Ver Más</button>
                    </div>
                </article>
            ))}

            {/* Integrar el componente TaskModal */}
            <TaskModal task={selectedTask} closeModal={closeModal} />
        </div>
    );
}

export default TaskCard;
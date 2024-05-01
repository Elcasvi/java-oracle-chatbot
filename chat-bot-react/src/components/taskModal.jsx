import React from 'react';

function TaskModal({ task, closeModal }) {
    if (!task) return null; // Si no hay tarea seleccionada, no mostrar el modal

    return (
        <div className="task-modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{task.name}</h2>
                <p><strong>Descripción:</strong> {task.description}</p>
                <p><strong>Estado:</strong> {task.state}</p>
                <p><strong>Prioridad:</strong> {task.priority}</p>
                {/* Agrega más información de la tarea aquí según tus necesidades */}
            </div>
        </div>
    );
}

export default TaskModal;

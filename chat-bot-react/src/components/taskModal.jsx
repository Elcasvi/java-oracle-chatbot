import React from 'react';

function TaskModal({ tasks, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Tasks</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.name}</strong> - {task.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskModal;

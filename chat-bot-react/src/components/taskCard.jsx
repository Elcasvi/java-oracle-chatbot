import React from 'react';

function TaskCard({ user }) {
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
        <div>
            {user.tasks.map(task => ( // Iterar sobre las tareas del usuario
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
                            <strong>{task.name}</strong>
                            <span className="dev-card-manager-numTask">Priority Task: {task.priority}</span>
                        </div>
                    </header>

                    <div className='dev-card-manager-button'>
                        <button className="dev-card-manager-showMore">Ver Más</button>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default TaskCard;

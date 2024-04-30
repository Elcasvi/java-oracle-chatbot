import React from 'react';

function TaskCard({ user }) {
    return (
        <div>
            {user.tasks.map(task => ( // Iterar sobre las tareas del usuario
                <article className='dev-card-manager' key={task.id}>
                    <header className="dev-card-manger-header">
                        <img className="dev-card-manger-icon"
                            alt="Dev Icon"
                            src="https://unavatar.io/user"></img>
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

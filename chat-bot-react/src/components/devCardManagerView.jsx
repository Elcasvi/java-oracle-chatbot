import React from 'react';
import { Link } from 'react-router-dom';

function DevCardManagerView({ user }) {
    return (
        <article className='dev-card-manager'>
            <header className="dev-card-manger-header">
                <Link to={`/tasks/${user.id}`}>
                    <img className="dev-card-manger-icon"
                        alt="Dev Icon"
                        src="https://unavatar.io/user"></img>
                </Link>
                <div className="dev-card-manager-name">
                    <strong>{user.name}</strong>
                    <span className="dev-card-manager-numTask">Numero de Task Asignadas: {user.tasks.length}</span>
                </div>
            </header>

            <div className='dev-card-manager-button'>
                <div>
                    <Link to={`/tasks/${user.id}`} className="dev-card-manager-showMore">Ver Más</Link>
                </div>
            </div>
        </article>
    );
}

export default DevCardManagerView;

    import React from 'react';
    import { Link } from 'react-router-dom';

function DevCardManagerView({ user }) {
    return (
        <article className='dev-card-manager'>
            <header className="dev-card-manger-header">
                <img className="dev-card-manger-icon"
                    alt="Dev Icon"
                    src="https://unavatar.io/user"></img>
                <div className="dev-card-manager-name">
                    <strong>{user.name}</strong>
                    <span className="dev-card-manager-numTask">Numero de Task Asignadas: {user.tasks.length}</span>
                </div>
            </header>

            <div className='dev-card-manager-button'>
                <Link to={`/tasks/${user.id}`} className="dev-card-manager-showMore">Ver Más</Link>
            </div>
        </article>
    );
}

    export default DevCardManagerView;

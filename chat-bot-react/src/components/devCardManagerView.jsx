import React, { useState } from 'react';
import TaskModal from './taskModal';

function DevCardManagerView({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                <button className="dev-card-manager-showMore" onClick={openModal}>Ver Más</button>
            </div>

            {isModalOpen && <TaskModal tasks={user.tasks} onClose={closeModal} />}
        </article>
    );
}

export default DevCardManagerView;


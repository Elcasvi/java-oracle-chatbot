import React from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '../util/UserModel';
import TaskCard from '../components/taskCard';

function ManagerViewTaskDeveloper() {
    const { userId } = useParams();

    // Buscar el usuario correspondiente en UserModel utilizando el userId
    const selectedUser = UserModel.find(user => user.id === parseInt(userId));

    if (!selectedUser) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <div className='developer-information'>
                <h1>{selectedUser.name}</h1>
                <p>Email: {selectedUser.email}</p>
                <p>Rol: {selectedUser.role}</p>
            </div>
            <h2 className='tareas-asignadas-text'>Tareas Asignadas:</h2>
            <div className='task-info-container'>
                <TaskCard user={selectedUser} />
            </div>
        </div>
    );
}

export default ManagerViewTaskDeveloper;

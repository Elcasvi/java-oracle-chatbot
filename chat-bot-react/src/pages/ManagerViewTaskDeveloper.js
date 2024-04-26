import React from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '../util/UserModel';

function ManagerViewTaskDeveloper() {
    const { userId } = useParams();

    // Buscar el usuario correspondiente en UserModel utilizando el userId
    const user = UserModel.find(user => user.id === parseInt(userId));

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <div className='developer-information'>
                <h1>{user.name}</h1>
                <p>Email: {user.email}</p>
                <p>Rol: {user.role}</p>
            </div>
            <h2 className='tareas-asignadas-text'>Tareas Asignadas:</h2>
            <div className='task-info-container'>
            <ul>
                {user.tasks.map(task => (
                    
                    <div key={task.id}>
                        <strong>{task.name}</strong> - {task.description}
                    </div>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default ManagerViewTaskDeveloper;

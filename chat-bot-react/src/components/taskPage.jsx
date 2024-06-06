import React from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '../util/UserModel';
import { UserModel2 } from '../util/UserModel2';

const findUserById = (id) => {
  return UserModel.find(user => user.id === parseInt(id)) || UserModel2.find(user => user.id === parseInt(id));
};

const TasksPage = () => {
  const { id } = useParams();
  const user = findUserById(id);

  if (!user) {
    return <div>UserNotFound</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Tasks</h1>
      <ul>
        {user.tasks.map(task => (
          <li key={task.id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;

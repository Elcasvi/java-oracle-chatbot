import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { animals } from '../pages/data';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const handleAddTask = () => {
    if (taskName && taskDescription && taskPriority) {
      onAddTask({
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        animal: selectedAnimal
      });
      setTaskName('');
      setTaskDescription('');
      setTaskPriority('');
      setSelectedAnimal('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Task</h2>
        <div className="input-row">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <h2>AQUÍ QUEDA PENDIENTE EL SELECT DE PRIORITY</h2>
        
        <button className="add-button" onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
};

export default AddTaskModal;

import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Modal } from '@nextui-org/react';
import { EditIcon } from "../assets/icons/edit_icon.tsx";

function AllTasks({ tasks }) {

    const [taskList, setTaskList] = useState(tasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleChangeStatus = (taskId, newStatus) => {
        const updatedTasks = taskList.map(task => {
            if (task.id === taskId) {
                return { ...task, state: newStatus };
            }
            return task;
        });
        setTaskList(updatedTasks);
    };

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

    const handleOpenModal = (task) => {
        console.log("Abrir modal para la tarea:", task);
        setSelectedTask(task);
        setModalOpen(true);
    };
    

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div >
            <h3>Your Tasksssss:</h3>
            {tasks.map(task => (
                <Card 
                    className="border-none max-w-[310px]" 
                    key={task.id} 
                    style={{ 
                        backgroundColor: '#E9E9E9', 
                        borderRadius: '10px', 
                        margin: '10px', 
                        border: '1px solid black',
                        padding: '15px',  
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'stretch' 
                    }} 
                >
                    <div style={{ flex: '1' }}>
                        <CardHeader >
                            <strong style={{ marginLeft: '50px' }}>{task.name}</strong>
                            <EditIcon style={{ marginLeft: '10px' }} />
                        </CardHeader>
                    </div>
                    <CardBody style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: getCircleColor(task.state),
                                marginRight: '10px'
                            }}
                        />
                        <div>
                            <span>State: {task.state}</span>
                            <br />
                            <span>Last Updated: {task.lastUpdated}</span>
                        </div>
                        <Button onClick={() => handleOpenModal(task)} style={{ marginLeft: 'auto' }}>
                            Ver más
                        </Button>
                    </CardBody>
                </Card>
            ))}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                {selectedTask && (
                    <div>
                        <h2>{selectedTask.name}</h2>
                        <p>State: {selectedTask.state}</p>
                        <p>Last Updated: {selectedTask.lastUpdated}</p>
                        {/* Aquí puedes agregar más detalles de la tarea */}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AllTasks;

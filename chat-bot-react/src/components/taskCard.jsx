import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

function TaskCard({ tasks }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCircleColor = (state) => {
        switch (state) {
            case 'DONE':
                return 'green';
            case 'IN_PROGRESS':
                return 'yellow';
            case 'TODO':
                return 'red';
            default:
                return 'gray';
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div >
            {tasks && tasks.map(task => (
                <Card   className="border-none max-w-full"
                style={{  padding: '15px',marginBottom: '17px', display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch'}}
                key={task.id} >
                    <CardHeader className="flex gap-3">
                        <div
                            className="dev-card-icon"
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                backgroundColor: getCircleColor(task.state)
                            }}
                            onClick={() => handleTaskClick(task)}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{task.name}</p>
                            <p className="text-small text-default-500">Priority Task: {task.priority}</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>{task.description}</p>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex justify-center">
                        <Button style={{backgroundColor:'#BC5BC4'}} auto flat  onClick={() => handleTaskClick(task)} className="ver-mas-button">
                            Ver Más
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                placement="center"
            >
                <ModalContent>
                    <ModalHeader>
                        <h2>{selectedTask ? selectedTask.name : ''}</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p><strong>Description:</strong> {selectedTask ? selectedTask.description : ''}</p>
                        <p><strong>State:</strong> {selectedTask ? selectedTask.state : ''}</p>
                        <p><strong>Priority:</strong> {selectedTask ? selectedTask.priority : ''}</p>
                    </ModalBody>
                    <ModalFooter className='footer-modal'>
                        <Button color="danger" variant="light" onPress={closeModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default TaskCard;
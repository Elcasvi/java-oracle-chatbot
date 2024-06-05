import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

function TaskCard({ tasks }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="dev-card-container">
            {tasks && tasks.map(task => (
                <Card key={task.id} className="max-w-[400px] mb-4">
                    <CardHeader className="flex gap-3">
                        <div
                            className="dev-card-icon"
                            style={{
                                width: 40,
                                height: 40,
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
                        <Button auto flat color="primary" onClick={() => handleTaskClick(task)} className="ver-mas-button">
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
                    <ModalFooter>
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
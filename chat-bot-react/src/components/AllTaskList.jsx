import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem } from '@nextui-org/react';
import { EditIcon } from "../assets/icons/edit_icon.tsx";

function AllTasks({ tasks }) {
    const [taskList, setTaskList] = useState(tasks);
    const [selectedTask, setSelectedTask] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const handleViewMore = (task) => {
        setSelectedTask(task);
        onOpen();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setSelectedTask((prevTask) => ({ ...prevTask, state: value }));
    };

    const handleSaveChanges = () => {
        const updatedTasks = taskList.map(task => {
            if (task.id === selectedTask.id) {
                return selectedTask;
            }
            return task;
        });
        setTaskList(updatedTasks);
        onOpenChange(false); // Close the modal
    };

    return (
        <div>
            <h3>Your Tasks:</h3>
            {taskList.map(task => (
                <Card
                    className="border-none max-w-full"
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
                        <CardHeader>
                            <strong style={{ marginLeft: '50px' }}>{task.name}</strong>
                            <EditIcon style={{ marginLeft: '10px' }} />
                        </CardHeader>
                    </div>
                    <CardBody style={{ display: 'flex', alignItems: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: getCircleColor(task.state),
                                    marginRight: '10px',
                                }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>State: {task.state}</span>
                                <span>Last Updated: {task.lastUpdated}</span>
                            </div>
                        </div>
                        <Button style={{ marginLeft: 'auto' }} onPress={() => handleViewMore(task)}>
                            Ver más
                        </Button>
                    </CardBody>
                </Card>
            ))}

            {selectedTask && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
                                <ModalBody>
                                    <Input
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={selectedTask.name}
                                        onChange={handleInputChange}
                                    />
                                    <Select
                                        fullWidth
                                        label="State"
                                        placeholder="Select State"
                                        value={selectedTask.state}
                                        onChange={handleSelectChange}
                                    >
                                        <SelectItem value="TODO">TODO</SelectItem>
                                        <SelectItem value="IN PROGRESS">IN PROGRESS</SelectItem>
                                        <SelectItem value="DONE">DONE</SelectItem>
                                    </Select>
                                    <Input
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={selectedTask.description}
                                        onChange={handleInputChange}
                                    />
                                   
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleSaveChanges}>
                                        Save Changes
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
}

export default AllTasks;


import React, { useState } from 'react';
import FilterDropdown from './filterDropdown';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import taskServices from '../services/taskServices';
import { AddIcon } from '../assets/icons/add_icon.tsx';

function OptionsBar({ onCreateSuccess, onSelectOption, userId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const options = ['Filter by Status', 'Filter by Priority'];

    const [ name, setName ] = useState();
    const [ description, setDescription ] = useState();
    const [ priority, setPriority ] = useState();

    const handleSelectOption = (option) => {
        onSelectOption(option);
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    const handlePriorityChange = (value) => {
        setPriority(value);
    };

    const addNewTask = () => {
        const task = {
            "id": 0,
            "name": name,
            "description": description,
            "lastUpdated": new Date().toISOString(),
            "priority": priority,
            "state": "TODO",
            "userId": userId
        }
        const taskService = new taskServices();
        const response = taskService.create(task);
        onClose(true)
        onCreateSuccess()
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button style={{ width: '200px', backgroundColor:'#BC5BC4' }} onClick={onOpen}>
                  Add New Task
                  <AddIcon></AddIcon>
                </Button>
                <FilterDropdown options={options} onSelectOption={handleSelectOption} />
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add New Task</ModalHeader>
                    <ModalBody>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Task Name"
                            onChange={handleInputChange}
                        />
                        <Input
                            name="description"
                            type="text"
                            placeholder="Task Description"
                            onChange={handleInputChange}
                        />
                        <Select
                            size='md'
                            className="max-w-xs"
                            label="Task Priority"
                            placeholder="Select Priority"
                            value={priority}
                            onChange={(e) => handlePriorityChange(e.target.value)}
                        >
                            <SelectItem key="LOW" value="LOW">LOW</SelectItem>
                            <SelectItem key="MEDIUM" value="MEDIUM">MEDIUM</SelectItem>
                            <SelectItem key="HIGH" value="HIGH">HIGH</SelectItem>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={addNewTask}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default OptionsBar;

import React from 'react';
import FilterDropdown from './filterDropdown';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";

function OptionsBar({ onSelectOption }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const options = ['Filter by Status', 'Filter by Priority'];

    const handleSelectOption = (option) => {
        onSelectOption(option);
        onClose();
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button style={{ width: '200px', backgroundColor:'#BC5BC4' }} onClick={onOpen}>Add New Task</Button>
                <FilterDropdown options={options} onSelectOption={handleSelectOption} />
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add New Task</ModalHeader>
                    <ModalBody>
                        <Input type="text" placeholder="Task Name" />
                        <Input type="text" placeholder="Task Description" />
                        <Select
                            size='md'
                            className="max-w-xs"
                            label="Task Priority"
                            placeholder="Select Priority"
                        >
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={onClose}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default OptionsBar;

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ModalTask({ task, closeModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!task) return null; // Si no hay tarea, no mostrar el modal

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{task.name}</ModalHeader>
        <ModalBody>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>State:</strong> {task.state}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          {/* Agrega más información de la tarea aquí según tus necesidades */}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={() => { closeModal(); onClose(); }}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

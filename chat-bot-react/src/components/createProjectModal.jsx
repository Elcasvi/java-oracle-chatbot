import React, { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure, 
  Input 
} from "@nextui-org/react";
import userServices from "../services/userServices";

const CreateProjectModal = ({ userId }) => {
  /*
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projectName, setProjectName] = useState("");

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreate(projectName);
      setProjectName("");
      onOpenChange(false);
    }
  };*/

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projectName, setProjectName] = useState('');

  const createProject = async () => {
    const project = {
      "id": 0,
      "name": projectName,
      "managerId": userId
    }

    const userService = new userServices();
    const data = await userService.createProject(project);
    await userService.asignarUserToProject(userId,data.data.id);    
  }

  return (
    <>
      <Button onPress={onOpen} color="secondary">+</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Project</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={createProject}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;

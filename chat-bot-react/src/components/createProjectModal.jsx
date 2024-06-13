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
import EyeIcon from "./eyeIcon";
import { AddIcon } from "../assets/icons/add_icon.tsx";

const CreateProjectModal = ({ userId, onCreateSuccess }) => {
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
    };
  
    try {
      const userService = new userServices();
      const data = await userService.createProject(project);
      await userService.asignarUserToProject(userId, data.data.id);
      onOpenChange(false);
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  return (
    <>
    
      <Button onPress={onOpen} color="secondary">
        
        New Project
        <AddIcon></AddIcon>
        </Button>

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
                  style={{ border: 'none', boxShadow: 'none' }}
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

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
import { AddIcon } from "../assets/icons/add_icon.tsx";

const AssignUserModal = ({ projectId, onAssignSuccess }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ userId, setUserId ] = useState();
  const [ userName, setUserName ] = useState();

  const addUserToProject = async () => {
    try {
      const userService = new userServices();
      await userService.asignarUserToProject(userId, projectId)
      onOpenChange(false);
      if(onAssignSuccess) {
        onAssignSuccess();
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  return (
    <>
      <Button style={{ width: '150px', backgroundColor:'#BC5BC4' }} onPress={onOpen} >
        Add User
        <AddIcon></AddIcon>
        </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Assign Users to Project</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input 
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={{ border: 'none', boxShadow: 'none' }}
                  />
                  <Input 
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ border: 'none', boxShadow: 'none' }}
                  />
                  <Button color="secondary" onPress={addUserToProject}>Add User</Button>
                  {/*{error && <span style={{ color: 'red' }}>{error}</span>}*/}
                </div>
                {/*<div className="mt-4">
                  <h5>Users to be Assigned:</h5>
                  <ul>
                    {userList.map((user, index) => (
                      <li key={index}>{user.name} (ID: {user.id})</li>
                    ))}
                  </ul>
                </div>*/}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignUserModal;

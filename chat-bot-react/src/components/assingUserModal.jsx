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

const AssignUserModal = ({ projectId }) => {
  /*
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState('');

  const handleAddUser = () => {
    
    const userIdNumber = parseInt(userId);
    const allUsers = [...UserModel, ...UserModel2];
    const matchedUser = allUsers.find(user => user.id === userIdNumber && user.name === userName);

    if (!matchedUser) {
      setError('User ID and Name do not match.');
      return;
    }

    setUserList([...userList, { id: userId, name: userName }]);
    setUserId('');
    setUserName('');
    setError('');
    

    
  };

  const handleAssign = () => {
    const userIds = userList.map(user => user.id);
    onAssignUsers(userIds);
    onOpenChange(false);
  }; */
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ userId, setUserId ] = useState();
  const [ userName, setUserName ] = useState();

  const addUserToProject = async () => {
    const userService = new userServices();
    await userService.asignarUserToProject(userId, projectId)
  }

  return (
    <>
      <Button onPress={onOpen} color="warning">Add User</Button>
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
                  />
                  <Input 
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                <Button color="primary" onPress={addUserToProject}>Assign</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignUserModal;

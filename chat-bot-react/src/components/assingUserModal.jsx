import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { UserModel } from "../util/UserModel";
import { UserModel2 } from "../util/UserModel2";

const AssignUserModal = ({ onAssignUsers }) => {
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
  };

  return (
    <>
      <Button style={{ width: '150px', backgroundColor:'#BC5BC4' }} onPress={onOpen} color="warning">Add User</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Assign Users to Project</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input 
                    label="User ID"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <Input 
                    label="User Name"
                    placeholder="Enter User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Button color="secondary" onPress={handleAddUser}>Add User</Button>
                  {error && <span style={{ color: 'red' }}>{error}</span>}
                </div>
                <div className="mt-4">
                  <h5>Users to be Assigned:</h5>
                  <ul>
                    {userList.map((user, index) => (
                      <li key={index}>{user.name} (ID: {user.id})</li>
                    ))}
                  </ul>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={handleAssign}>Assign</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignUserModal;

import React, { useState, useEffect } from 'react';
import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css";
import { UserModel } from "../util/UserModel";
import { UserModel2 } from "../util/UserModel2";
import FilterDropdown from "../components/filterDropdown";
import BackButton from "../components/backButton";
import AssignUserModal from '../components/assingUserModal';
import projectUsers from '../icons/project-users-icon.PNG';
import { Image } from '@nextui-org/react';
import Logout from '../components/LogoutButton';

export default function ManagerHomePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);

  const allUsers = [...UserModel, ...UserModel2];
  const options = ['Nombre (A-Z)', 'Nombre (Z-A)'];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const sortUsers = (users, option) => {
    switch (option) {
      case 'Nombre (A-Z)':
        return users.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'Nombre (Z-A)':
        return users.slice().sort((a, b) => b.name.localeCompare(a.name));
      default:
        return users;
    }
  };

  const sortedUsers = selectedOption ? sortUsers(allUsers, selectedOption) : allUsers;

  const handleAssignUsers = (userIds) => {
    const newAssignedUsers = allUsers.filter(user => userIds.includes(user.id.toString()));
    const updatedAssignedUsers = [...new Set([...assignedUsers, ...newAssignedUsers])];
    setAssignedUsers(updatedAssignedUsers);
  };

  const displayedUsers = selectedOption ? sortUsers(assignedUsers.length ? assignedUsers : allUsers, selectedOption) : (assignedUsers.length ? assignedUsers : allUsers);

  return (
    <div>
      <Logout />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilterDropdown options={options} onSelectOption={handleSelectOption} />
        <AssignUserModal onAssignUsers={handleAssignUsers} />
      </div>
      <DevCardManagerView users={displayedUsers} />
    </div>
  );
}

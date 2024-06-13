import React, { useState, useEffect } from 'react';
import DevCardManagerView from "../components/devCardManagerView";
import "../styles/devCardManagerViewStyle.css";
import { UserModel } from "../util/UserModel";
import FilterDropdown from "../components/filterDropdown";
import BackButton from "../components/backButton";
import AssignUserModal from '../components/assingUserModal';
import projectUsers from '../icons/project-users-icon.PNG';
import { Image } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import userServices from '../services/userServices';
import Logout from '../components/LogoutButton';
import LoadingSpinner from '../components/loadingSpinner';

export default function ManagerHomePage() {
  const { projectId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  //const [assignedUsers, setAssignedUsers] = useState([]);
  const [allUsers, setAllusers] = useState(null);

  const getAllUsers = async () => {
    const userService = new userServices();
    const response = await userService.getUsersOfProject(projectId);
    if (response && response.data) {
      setAllusers(response.data);
    } else {
      setAllusers([]);
    }
  }

  useEffect(()=>{
    if(projectId){
      getAllUsers();
    }
  },[projectId])

  const assignSuccess = () => {
    getAllUsers();
  }

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
  //const displayedUsers = selectedOption ? sortUsers(assignedUsers.length ? assignedUsers : allUsers, selectedOption) : (assignedUsers.length ? assignedUsers : allUsers);

  return (
    <div>
      <Logout />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilterDropdown options={options} onSelectOption={handleSelectOption} />
        <AssignUserModal 
          projectId={projectId}
          onAssignSuccess={assignSuccess}
        />
      </div>
      {sortedUsers === null ? (
        <LoadingSpinner />
      ) : (
        <DevCardManagerView users={sortedUsers} />
      )}
    </div>
  );
}

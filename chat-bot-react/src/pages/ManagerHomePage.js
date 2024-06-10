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

export default function ManagerHomePage() {
  const { projectId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  //const [assignedUsers, setAssignedUsers] = useState([]);
  const [allUsers, setAllusers] = useState(UserModel);

  useEffect(()=>{
    const userService = new userServices();
    userService.getUsersOfProject(projectId).then(data =>{
      setAllusers(data.data)
    })
  },[projectId])

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
      <BackButton text="Salir" />
      <div className='container-icon-image'>
        <Image
          isBlurred
          width={150}
          src={projectUsers}
          alt="NextUI Album Cover"
          className="m-5"
        />
      </div>
      <div className='buttons-manager-home-page'>
        <FilterDropdown options={options} onSelectOption={handleSelectOption} />
        <AssignUserModal projectId={projectId}/>
      </div>
      <DevCardManagerView users={sortedUsers} />
    </div>
  );
}

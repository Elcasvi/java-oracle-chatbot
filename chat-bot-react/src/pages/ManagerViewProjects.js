import React, { useEffect, useState } from 'react';
import ProjectTable from '../components/projectTable'; // Ajusta la ruta según sea necesario
import CreateProjectModal from '../components/createProjectModal'; // Ajusta la ruta según sea necesario
import { Image } from '@nextui-org/react';
import "../styles/devCardManagerViewStyle.css"; // Asegúrate de importar el archivo CSS
import yourProjectsIcon from '../icons/your-projects-icon.PNG';
import userServices from '../services/userServices';
import LoadingSpinner from '../components/loadingSpinner';
import Logout from '../components/LogoutButton';

function ManagerViewProjects({ userId }) {
  const [projects, setProjects] = useState(null);
  const [ version, setVersion ] = useState(null);

  const getProjects = async () => {
    const userService = new userServices();
    const response = await userService.getAllMangerProjects(userId);
    const response2 = await userService.getVersion();
    if (response && response.data) {
      setProjects(response.data);
      setVersion(response2.data)
    } else {
      setProjects([]);
    }
  }

  useEffect(() => {
    if (userId) {
      getProjects();
    }
  }, [userId]);

  const handleCreateSuccess = () => {
    getProjects(); 
  };

  return (
    <div>
      <Logout/> 
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', width:1250 }}>
      <CreateProjectModal 
        userId={userId} 
        onCreateSuccess={handleCreateSuccess} 
      />
      </div>
      {projects === null ? (
        <LoadingSpinner />
      ) : (
        <ProjectTable projects={projects} />
      )}

      <div className="version-container">Version: {version}</div>
    </div>
  );
}

export default ManagerViewProjects;

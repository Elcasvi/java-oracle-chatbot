import React, { useEffect, useState } from 'react';
import BackButton from '../components/backButton';
import ProjectTable from '../components/projectTable'; // Ajusta la ruta según sea necesario
import CreateProjectModal from '../components/createProjectModal'; // Ajusta la ruta según sea necesario
import { Image } from '@nextui-org/react';
import "../styles/devCardManagerViewStyle.css"; // Asegúrate de importar el archivo CSS
import yourProjectsIcon from '../icons/your-projects-icon.PNG';
import userServices from '../services/userServices';

function ManagerViewProjects({ userId }) {
  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    const userService = new userServices();
    const response = await userService.getAllMangerProjects(userId);
    if (response && response.data) {
      setProjects(response.data);
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
      <BackButton />
      <div className="container-icon-image">
        <Image
          isBlurred
          width={150}
          src={yourProjectsIcon}
          alt="NextUI Album Cover"
          className="m-5"
        />
      </div>
      <div className="create-project-container">
      <CreateProjectModal 
        userId={userId} 
        onCreateSuccess={handleCreateSuccess} 
      />
      </div>
      {projects === null ? (
        <p>Cargando proyectos...</p>
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  );
}

export default ManagerViewProjects;

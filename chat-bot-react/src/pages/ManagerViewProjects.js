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
    const userService = new userServices()
    await userService.getAllMangerProjects(userId).then(data => {
      setProjects(data.data)
    })
    
  }

  useEffect(() => {
    if (userId) {
      getProjects();
    }
  }, [userId]); 

/*
  const handleCreateProject = (projectName) => {
    const newProject = {
      id: projects.length + 1, 
      name: projectName,
    };
    setProjects([...projects, newProject]);
  }; */

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
        <CreateProjectModal userId={userId}/>
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

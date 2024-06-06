import React, { useState } from 'react';
import BackButton from '../components/backButton';
import ProjectTable from '../components/projectTable'; // Ajusta la ruta según sea necesario
import { ProjectModel } from '../util/ProjectModel'; // Ajusta la ruta según sea necesario
import CreateProjectModal from '../components/createProjectModal'; // Ajusta la ruta según sea necesario
import { Image } from '@nextui-org/react';
import "../styles/devCardManagerViewStyle.css"; // Asegúrate de importar el archivo CSS
import yourProjectsIcon from '../icons/your-projects-icon.PNG';

function ManagerViewProjects() {
  const [projects, setProjects] = useState(ProjectModel);

  const handleCreateProject = (projectName) => {
    const newProject = {
      id: projects.length + 1, // Ajusta este ID según tu lógica de backend o base de datos
      name: projectName,
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div>
      <BackButton />
      <div className='container-icon-image'>
        <Image
          isBlurred
          width={150}
          src={yourProjectsIcon}
          alt="NextUI Album Cover"
          className="m-5"  
        />
      </div>
      <div className='create-project-container'>
        <CreateProjectModal onCreate={handleCreateProject} />
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
}

export default ManagerViewProjects;

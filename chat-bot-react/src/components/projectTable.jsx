import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import EyeIcon from "./eyeIcon"; // Asegúrate de tener este componente o ícono
import "../styles/devCardManagerViewStyle.css"; // Asegúrate de importar el archivo CSS

const ProjectTable = ({ projects }) => {
  const navigate = useNavigate();

  const handleViewDetails = (projectId) => {
    navigate(`/manager-home-page/${encodeURIComponent(projectId)}`);
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <Table aria-label="Project table">
          <TableHeader>
            <TableColumn align="start">PROJECT NAME</TableColumn>
            <TableColumn align="center">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="table-row">
                <TableCell data-label="PROJECT NAME">{project.name}</TableCell>
                <TableCell data-label="ACTIONS">
                  <Tooltip content="View Details">
                    <Button
                    style={{backgroundColor:'#BC5BC4'}}
                      auto
                      flat
                      
                      onClick={() => handleViewDetails(project.id)}
                      icon={<EyeIcon />}
                      variant="shadow"
                    >
                      View Members
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectTable;

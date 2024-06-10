package net.sanchezapps.usersservice.persistence.mappers;

import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ProjectMapper {
    public ProjectMapper(){}

    public Project entityToApi(ProjectEntity projectEntity) {
        Project project = new Project();
        project.setId(projectEntity.getId());
        project.setName(projectEntity.getName());
        project.setManagerId(projectEntity.getManagerId());
        return project;
    }

    public ProjectEntity apiToEntity(Project project) {
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId(project.getId());
        projectEntity.setName(project.getName());
        projectEntity.setManagerId(project.getManagerId());

        return projectEntity;
    }

    public List<Project> entityListToApiList(List<ProjectEntity> projectEntities) {
        List<Project> projects = new ArrayList<>();
        for (ProjectEntity projectEntity : projectEntities) {
            projects.add(entityToApi(projectEntity));
        }
        return projects;
    }
    public List<ProjectEntity>apiListToEntityList(List<Project> projects) {
        List<ProjectEntity> projectEntities = new ArrayList<>();
        for (Project project : projects) {
            projectEntities.add(apiToEntity(project));
        }
        return projectEntities;
    }
}

package net.sanchezapps.usersservice.controllers;

import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.api.core.projects.ProjectsController;
import net.sanchezapps.usersservice.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = {"https://chatbot.sanchezapps.net","http://localhost:3000"})
public class ProjectsControllerImpl implements ProjectsController {
    private final ProjectService service;
    @Autowired
    public ProjectsControllerImpl(ProjectService service)
    {
        this.service=service;
    }

    @Override
    public Flux<Project> getAll() {
        return service.getAll();
    }

    @Override
    public Mono<Project> getById(Long projectId) {
        return service.getById(projectId);
    }

    @Override
    public Mono<Boolean> existsById(Long projectId) {
        return null;
    }

    @Override
    public Mono<Project> create(Project project) {
        return service.register(project);
    }

    @Override
    public void delete(Long projectId) {

    }
}

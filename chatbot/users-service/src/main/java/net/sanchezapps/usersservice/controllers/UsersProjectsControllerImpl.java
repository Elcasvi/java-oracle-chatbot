package net.sanchezapps.usersservice.controllers;

import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.api.core.users.UsersProjectsController;
import net.sanchezapps.usersservice.services.ProjectService;
import net.sanchezapps.usersservice.services.UserProjectService;
import net.sanchezapps.usersservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = {"https://chatbot.sanchezapps.net","https://okeui.sanchezapps.net","http://localhost:3000"})
public class UsersProjectsControllerImpl implements UsersProjectsController {
    private final UserProjectService service;
    @Autowired
    public UsersProjectsControllerImpl(UserService userService, ProjectService projectService, UserProjectService service)
    {
        this.service = service;
    }

    @Override
    public Flux<Project> getProjectsOfUser(Long userId) {
        return service.getProjectsOfUser(userId);
    }

    @Override
    public Flux<User> getUsersOfProject(Long projectId) {
        return service.getUsersOfProject(projectId);
    }

    @Override
    public void assignUserToProject(Long userId, Long projectId) {
        service.assignUserToProject(userId,projectId);
    }

    @Override
    public Mono<Project> deleteUserFromProject(Long projectId, Long UserId) {
        return service.deleteUserFromProject(projectId,UserId);
    }
}

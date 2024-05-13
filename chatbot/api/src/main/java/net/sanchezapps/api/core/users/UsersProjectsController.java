package net.sanchezapps.api.core.users;

import net.sanchezapps.api.core.projects.Project;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import reactor.core.publisher.Flux;


public interface UsersProjectsController {
    @GetMapping(value = "/users/getProjects/{userId}")
    Flux<Project> getProjectsOfUser(@PathVariable(name = "userId") Long userId);

    @GetMapping(value = "/projects/getUsers/{projectId}")
    Flux<User> getUsersOfProject(@PathVariable(name = "projectId") Long projectId);

    @PostMapping(value = "/users/assignUserToProject/{userId}/{projectId}")
    void assignUserToProject(@PathVariable(name = "userId") Long userId, @PathVariable(name = "projectId") Long projectId);
}

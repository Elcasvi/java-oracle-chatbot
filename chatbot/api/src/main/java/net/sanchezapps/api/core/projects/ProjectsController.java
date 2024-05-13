package net.sanchezapps.api.core.projects;

import net.sanchezapps.api.core.users.User;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectsController {
    @GetMapping(value = "/projects")
    Flux<Project> getAll();

    @GetMapping(value = "/projects/{projectId}")
    Mono<Project> getById(@PathVariable("projectId") Long projectId);

    @GetMapping(value = "/projects/exists/{projectId}")
    Mono<Boolean> existsById(@PathVariable("projectId") Long projectId);

    @PostMapping(value = "/projects")
    Mono<Project> create(@RequestBody Project project);

    @DeleteMapping(value = "/projects/delete/{projectId}")
    void delete(@PathVariable Long projectId);
}

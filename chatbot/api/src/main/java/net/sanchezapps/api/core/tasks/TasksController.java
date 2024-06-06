package net.sanchezapps.api.core.tasks;


import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;

public interface TasksController {
    @GetMapping(value = "/tasks")
    Flux<Task> getAll();

    @GetMapping(value = "/tasks/{taskId}")
    Mono<Task> getById(@PathVariable("taskId") Long taskId);

    @GetMapping(value = "/users/{userId}/tasks")
    Flux<Task> getAllByUserId(@PathVariable("userId") Long userId) throws IOException;

    @GetMapping(value = "/users/{userId}/tasks/filter/byPriority")
    Flux<Task> getAllByUserIdAndPriority(@PathVariable("userId") Long userId, @RequestParam TaskPriority priority) throws IOException;

    @GetMapping(value = "/users/{userId}/tasks/filter/byState")
    Flux<Task> getAllByUserIdAndState(@PathVariable("userId") Long userId, @RequestParam TaskState state) throws IOException;

    @PostMapping(value = "/task")
    Mono<Task> create(@RequestBody Task task);

    // Esta se llamara para cambiar el status a delete para el DELETE del usuario para entrega
    @PutMapping(value = "/task/{taskId}")
    Mono<Task> update(@PathVariable("taskId") Long taskId, @RequestBody Task task);

    @DeleteMapping(value = "/task/{taskId}")
    void delete(@PathVariable("taskId") Long taskId);
}

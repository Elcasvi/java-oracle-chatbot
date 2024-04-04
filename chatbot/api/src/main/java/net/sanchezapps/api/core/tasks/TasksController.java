package net.sanchezapps.api.core.tasks;


import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface TasksController {
    @GetMapping(value = "/tasks")
    List<Task> getAll();

    @GetMapping(value = "/tasks/{taskId}")
    Task getById(@PathVariable("taskId") Long taskId);

    @GetMapping(value = "/tasks/filter/byState")
    List<Task> getByState(@RequestParam TaskState state);

    @GetMapping(value = "/tasks/filter/byPriority")
    List<Task> getByPriority(@RequestParam TaskPriority priority);

    @GetMapping(value = "/users/{userId}/tasks")
    List<Task> getAllByUserId(@PathVariable("userId") int userId);

    @GetMapping(value = "/users/{userId}/tasks/filter/byPriority")
    List<Task> getAllByUserIdAndPriority(@PathVariable("userId") int userId, @RequestParam TaskPriority priority);

    @PostMapping(value = "/task")
    void create(@RequestBody Task task);

    @PutMapping(value = "/task/{taskId}")
    void update(@PathVariable("taskId") Long taskId, @RequestBody Task task);

    @DeleteMapping(value = "/task/{taskId}")
    void delete(@PathVariable("taskId") Long taskId);
}

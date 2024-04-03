package net.sanchezapps.api.core.tasks;


import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface TasksController {
    @GetMapping
    List<Task>getAllTasks();
    @GetMapping("/{id}")
    Task getTaskById(@PathVariable int id);
    @PostMapping
    Task createTask(@RequestBody Task task);
    @PutMapping("/{id}")
    Task updateTask(@PathVariable int id, @RequestBody Task task);
    @DeleteMapping("/{id}")
    void deleteTask(@PathVariable int id);
}

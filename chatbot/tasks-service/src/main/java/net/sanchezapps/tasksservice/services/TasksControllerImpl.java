package net.sanchezapps.tasksservice.services;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.api.core.tasks.TasksController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;


@RestController
public class TasksControllerImpl implements TasksController {

    private final TasksService service;


    @Autowired
    public TasksControllerImpl(TasksService service) {
        this.service = service;
    }

    @Override
    public Flux<Task> getAll() {
       return service.getAll();
    }

    @Override
    public Mono<Task> getById(Long taskId) {
       return service.getById(taskId);
    }

    @Override
    public Flux<Task> getAllByUserId(Long userId) throws IOException {
       return service.getAllByUserId(userId);
    }

    @Override
    public Flux<Task> getAllByUserIdAndPriority(Long userId, TaskPriority priority) throws IOException {
        return service.getAllByUserIdAndPriority(userId,priority);
    }

    @Override
    public Flux<Task> getAllByUserIdAndState(Long userId, TaskState state) throws IOException {
       return service.getAllByUserIdAndState(userId,state);
    }

    @Override
    public Mono<Task> create(Task task) {
       return service.register(task);
    }

    @Override
    public Mono<Task> update(Long taskId, Task task) {
       return service.update(taskId,task);
    }

    @Override
    public void delete(Long taskId) {
        service.delete(taskId);
    }
}

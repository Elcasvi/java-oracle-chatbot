package net.sanchezapps.tasksservice.services;

import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class TasksService {
    private static final String USERS_SERVICE_URL = "http://users-service";

    private final TasksRepository repository;
    private final WebClient webClient;
    @Autowired
    public TasksService(TasksRepository repository, WebClient.Builder webClientBuilder)
    {
        this.repository=repository;
        this.webClient = webClientBuilder.build();
    }
    public Optional<TaskEntity> getById(Long taskId)
    {
        if(exists(taskId))
        {
            return repository.findById(taskId);
        }
        return Optional.empty();
    }
    public List<TaskEntity>getAll()
    {
        return repository.findAll();
    }
    public List<TaskEntity> getAllByUserId(Long userId) {
        String url = USERS_SERVICE_URL + "/users/" + userId;
        return repository.findAllByUserId(userId);
    }
    public List<TaskEntity> getAllByUserIdAndState(Long userId,TaskState state) {
        return repository.findAllByUserIdAndState(userId,state);
    }
    public List<TaskEntity> getAllByUserIdAndPriority(Long userId,TaskPriority priority) {
        return repository.findAllByUserIdAndPriority(userId,priority);
    }

    public TaskEntity register(TaskEntity task) {
        return repository.save(task);
    }

    public TaskEntity update(Long taskId, TaskEntity task) {
        if (exists(taskId)) {
            return repository.save(task);
        }
        return null;
    }

    public void delete(Long taskId) {
        if(exists(taskId))
        {
            repository.deleteById(taskId);
        }
    }
    private boolean exists(Long taskId)
    {
        return repository.existsById(taskId);
    }
}

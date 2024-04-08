package net.sanchezapps.tasksservice.services;

import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TasksService {
    private final TasksRepository repository;
    @Autowired
    public TasksService(TasksRepository repository)
    {
        this.repository=repository;
    }
    public Optional<TaskEntity> getById(Long taskId)
    {
        if(exists(taskId))
        {
            return repository.findById(taskId);
        }
        return Optional.empty();
    }
    public List<TaskEntity> getAllByUserId(Long userId) {
        return repository.findAllByUserId(userId);
    }
    public List<TaskEntity> getAllByUserIdAndState(Long userId,TaskState state) {
        return repository.findAllByUserIdAndState(userId,state);
    }
    public List<TaskEntity> getAllByUserIdAndPriority(Long userId,TaskPriority priority) {
        return repository.findAllByUserIdAndPriority(userId,priority);
    }

    public void create(TaskEntity task) {
        repository.save(task);
    }

    public void update(Long taskId, TaskEntity task) {
        if (exists(taskId)) {
            repository.save(task);
        }
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

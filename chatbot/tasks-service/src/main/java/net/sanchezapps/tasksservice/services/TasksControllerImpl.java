package net.sanchezapps.tasksservice.services;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.api.core.tasks.TasksController;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class TasksControllerImpl implements TasksController {
    private final TasksService service;
    private final TaskMapper mapper;

    @Autowired
    public TasksControllerImpl(TasksService service,TaskMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @Override
    public List<Task> getAll() {
        return List.of();
    }

    @Override
    public Task getById(Long taskId) {
        Optional<TaskEntity> taskEntity=service.getById(taskId);
        if(taskEntity.isPresent()){
            return mapper.entityToApi(taskEntity.get());
        }
        return null;
    }

    @Override
    public List<Task> getAllByUserId(Long userId) {
        List<TaskEntity>taskEntities=service.getAllByUserId(userId);
        return mapper.entityListToApiList(taskEntities);
    }

    @Override
    public List<Task> getAllByUserIdAndPriority(Long userId, TaskPriority priority) {
        List<TaskEntity>taskEntities=service.getAllByUserIdAndPriority(userId,priority);
        return mapper.entityListToApiList(taskEntities);
    }

    @Override
    public List<Task> getAllByUserIdAndState(Long userId, TaskState state) {
        List<TaskEntity>taskEntities=service.getAllByUserIdAndState(userId,state);
        return mapper.entityListToApiList(taskEntities);
    }

    @Override
    public void create(Task task) {
        TaskEntity taskEntity=mapper.apiToEntity(task);
        service.create(taskEntity);
    }

    @Override
    public void update(Long taskId, Task task) {
        TaskEntity taskEntity=mapper.apiToEntity(task);
        service.update(taskId,taskEntity);
    }

    @Override
    public void delete(Long taskId) {
        service.delete(taskId);
    }
}

package net.sanchezapps.tasksservice.persistence;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.users.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TaskMapper {
    public Task entityToApi(TaskEntity taskEntity) {
        Task task = new Task();
        task.setId(taskEntity.getId());
        task.setName(taskEntity.getName());
        task.setDescription(taskEntity.getDescription());
        task.setLastUpdated(taskEntity.getLastUpdated());
        task.setPriority(taskEntity.getPriority());
        task.setState(taskEntity.getState());
        task.setUserId(taskEntity.getUserId());
        return task;
    }

    public TaskEntity apiToEntity(Task task) {
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setId(task.getId());
        taskEntity.setName(task.getName());
        taskEntity.setDescription(task.getDescription());
        taskEntity.setLastUpdated(task.getLastUpdated());
        taskEntity.setPriority(task.getPriority());
        taskEntity.setState(task.getState());
        taskEntity.setUserId(task.getUserId());
        return taskEntity;
    }
    public List<Task> entityListToApiList(List<TaskEntity> taskEntities) {
        List<Task> tasks = new ArrayList<>();
        for (TaskEntity taskEntity : taskEntities) {
            tasks.add(entityToApi(taskEntity));
        }
        return tasks;
    }
    public List<TaskEntity> apiListToEntityList(List<Task> tasks) {
        List<TaskEntity> taskEntities = new ArrayList<>();
        for (Task task : tasks) {
            taskEntities.add(apiToEntity(task));
        }
        return taskEntities;
    }
}


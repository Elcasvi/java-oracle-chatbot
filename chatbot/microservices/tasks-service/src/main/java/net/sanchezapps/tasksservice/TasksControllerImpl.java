package net.sanchezapps.tasksservice;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.api.core.tasks.TasksController;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class TasksControllerImpl implements TasksController {


    @Override
    public List<Task> getAll() {
        return List.of();
    }

    @Override
    public Task getById(Long taskId) {
        return null;
    }

    @Override
    public List<Task> getByState(TaskState state) {
        return List.of();
    }

    @Override
    public List<Task> getByPriority(TaskPriority priority) {
        return List.of();
    }

    @Override
    public List<Task> getAllByUserId(int userId) {
        return List.of();
    }

    @Override
    public List<Task> getAllByUserIdAndPriority(int userId, TaskPriority priority) {
        return List.of();
    }

    @Override
    public void create(Task task) {

    }

    @Override
    public void update(Long taskId, Task task) {

    }

    @Override
    public void delete(Long taskId) {

    }
}

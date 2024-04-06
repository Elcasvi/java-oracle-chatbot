package net.sanchezapps.tasksservice.persistence;

import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TasksRepository extends JpaRepository<TaskEntity,Long> {
    List<TaskEntity> findAllByUserId(Long userId);
    List<TaskEntity> findAllByUserIdAndPriority(Long userId,TaskPriority priority);
    List<TaskEntity> findAllByUserIdAndState(Long userId,TaskState state);
}

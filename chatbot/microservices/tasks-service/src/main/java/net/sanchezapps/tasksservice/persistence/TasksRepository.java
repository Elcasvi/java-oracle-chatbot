package net.sanchezapps.tasksservice.persistence;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TasksRepository extends JpaRepository<TaskEntity,Long> {
}

package net.sanchezapps.tasksservice.services;

import net.sanchezapps.tasksservice.persistence.TasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TasksService {
    private final TasksRepository repository;
    @Autowired
    public TasksService(TasksRepository repository)
    {
        this.repository=repository;
    }

}

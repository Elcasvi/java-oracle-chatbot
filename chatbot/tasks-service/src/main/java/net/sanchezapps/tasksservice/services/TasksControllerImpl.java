package net.sanchezapps.tasksservice.services;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.api.core.tasks.TasksController;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.List;
import java.util.Optional;

@RestController
public class TasksControllerImpl implements TasksController {

    private final TasksService service;
    private final TaskMapper mapper;
    private final Scheduler jdbcScheduler;


    @Autowired
    public TasksControllerImpl(TasksService service, TaskMapper mapper,@Qualifier("jdbcScheduler") Scheduler jdbcScheduler) {
        this.service = service;
        this.mapper = mapper;
        this.jdbcScheduler = jdbcScheduler;
    }

    @Override
    public Flux<Task> getAll() {
       return Mono.fromCallable(()->{
           List<TaskEntity>entityList=service.getAll();
           List<Task>taskList=mapper.entityListToApiList(entityList);
           return taskList;
       }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<Task> getById(Long taskId) {
        return Mono.fromCallable(()->{
            Optional<TaskEntity> taskEntity=service.getById(taskId);
            if(taskEntity.isPresent()) {
                return mapper.entityToApi( taskEntity.get());
            }
            return null;
        }).subscribeOn(jdbcScheduler);
    }

    @Override
    public Flux<Task> getAllByUserId(Long userId) {
        return Mono.fromCallable(()->{
            List<TaskEntity>entityList=service.getAllByUserId(userId);
            List<Task>taskList=mapper.entityListToApiList(entityList);
            return taskList;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }

    @Override
    public Flux<Task> getAllByUserIdAndPriority(Long userId, TaskPriority priority) {
        return Mono.fromCallable(()->{
            List<TaskEntity>entityList=service.getAllByUserIdAndPriority(userId,priority);
            List<Task>taskList=mapper.entityListToApiList(entityList);
            return taskList;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }

    @Override
    public Flux<Task> getAllByUserIdAndState(Long userId, TaskState state) {
        return Mono.fromCallable(()->{
            List<TaskEntity>entityList=service.getAllByUserIdAndState(userId,state);
            List<Task>taskList=mapper.entityListToApiList(entityList);
            return taskList;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<Task> create(Task task) {
        return Mono.fromCallable(()->{
            try {
                TaskEntity taskEntity=mapper.apiToEntity(task);
                TaskEntity newTaskEntity=service.register(taskEntity);
                return mapper.entityToApi(newTaskEntity);
            }
            catch(DataIntegrityViolationException dive) {
                throw new RuntimeException("User already exists");
            }
        }).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<Task> update(Long taskId, Task task) {
        return Mono.fromCallable(()->{
            try {
                TaskEntity taskEntity=mapper.apiToEntity(task);
                TaskEntity newTaskEntity=service.update(taskId,taskEntity);
                return mapper.entityToApi(newTaskEntity);
            }
            catch(DataIntegrityViolationException dive) {
                throw new RuntimeException("User already exists");
            }
        }).subscribeOn(jdbcScheduler);
    }

    @Override
    public void delete(Long taskId) {
        service.delete(taskId);
    }
}

package net.sanchezapps.tasksservice.services;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TaskMapper;
import net.sanchezapps.tasksservice.persistence.TasksRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static java.util.logging.Level.FINE;


@Service
public class TasksService {
    private static final String USERS_SERVICE_URL = "http://users-service";
    //private static final String USERS_SERVICE_URL = "http://localhost:7001";
    private static final Logger LOG = LoggerFactory.getLogger(TasksService.class);

    private final TasksRepository repository;
    private final WebClient webClient;
    private final TaskMapper mapper;
    private final Scheduler jdbcScheduler;

    @Autowired
    public TasksService(TasksRepository repository, WebClient.Builder webClientBuilder, TaskMapper mapper,@Qualifier("jdbcScheduler") Scheduler jdbcScheduler)
    {
        this.repository=repository;
        this.webClient = webClientBuilder.build();
        this.mapper = mapper;
        this.jdbcScheduler = jdbcScheduler;
    }
    public Mono<Task> getById(Long taskId)
    {
        return Mono.fromCallable(()->{
            Optional<TaskEntity> userEntity=repository.findById(taskId);
            if(userEntity.isPresent())
            {
                return mapper.entityToApi(userEntity.get());
            }
            throw new RuntimeException("Task with ID: " + taskId + " not found.");
        }).subscribeOn(jdbcScheduler);
    }
    public Flux<Task>getAll()
    {
        return Mono.fromCallable(()->{
            List<TaskEntity>entityList=repository.findAll();
            return mapper.entityListToApiList(entityList);
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }
    public Flux<Task> getAllByUserId(Long userId) throws IOException {
        return Mono.fromCallable(()->{
            if(getUser(userId))
            {
                List<TaskEntity>entityList=repository.findAllByUserId(userId);
                return mapper.entityListToApiList(entityList);
            }
            throw new RuntimeException("User with ID: " + userId + " not found.");
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);

    }
    public Flux<Task> getAllByUserIdAndState(Long userId,TaskState state) throws IOException {

        return Mono.fromCallable(()->{
            if(getUser(userId))
            {
            List<TaskEntity>entityList=repository.findAllByUserIdAndState(userId,state);
            return mapper.entityListToApiList(entityList);
            }
            throw new RuntimeException("User with ID: " + userId + " not found.");
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }
    public Flux<Task> getAllByUserIdAndPriority(Long userId,TaskPriority priority) throws IOException {

        return Mono.fromCallable(()->{
            if(getUser(userId))
            {
            List<TaskEntity>entityList=repository.findAllByUserIdAndPriority(userId,priority);
            return mapper.entityListToApiList(entityList);
            }
            throw new RuntimeException("User with ID: " + userId + " not found.");
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);

    }

    public Mono<Task> register(Task task) {
        return Mono.fromCallable(()->{
            if(getUser(task.getUserId()))
            {
                TaskEntity taskEntity=mapper.apiToEntity(task);
                TaskEntity newTaskEntity=repository.save(taskEntity);
                return mapper.entityToApi(newTaskEntity);
            }
            throw new RuntimeException("User with ID: " + task.getUserId() + " not found.");
        }).subscribeOn(jdbcScheduler);
    }

    public Mono<Task> update(Long taskId, Task task) {
        if (exists(taskId)) {
            return Mono.fromCallable(()->{
                TaskEntity taskEntity=mapper.apiToEntity(task);
                TaskEntity newTaskEntity=repository.save(taskEntity);
                return mapper.entityToApi(newTaskEntity);
            }).subscribeOn(jdbcScheduler);
        }
        throw new RuntimeException("Task with ID: "+task.getId()+" not found.");
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

    private Boolean getUser(Long userId) {
        String url = USERS_SERVICE_URL + "/users/exists/" + userId;
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(Boolean.class)
                .log(LOG.getName(), FINE)
                .onErrorResume(error -> Mono.empty())
                .block();
    }
}

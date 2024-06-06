package net.sanchezapps.usersservice.services;

import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.users.Status;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.mappers.UserMapper;
import net.sanchezapps.usersservice.persistence.repositories.ProjectRepository;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static java.util.logging.Level.FINE;

@Service
public class UserService {
    private final String TASKS_SERVICE_URL="http://tasks-service";
    private final String SECURITY_SERVICE_URL="http://security-service";
    //private final String SECURITY_SERVICE_URL="http://localhost:8002";

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);
    private final UserRepository repository;
    private final ProjectRepository prepository;
    private final WebClient webClient;
    private final UserMapper mapper;
    private final Scheduler jdbcScheduler;
    @Autowired
    public UserService(UserRepository repository, ProjectRepository prepository, WebClient.Builder webClientBuilder, UserMapper mapper, @Qualifier("jdbcScheduler") Scheduler jdbcScheduler) {
        this.repository = repository;
        this.prepository = prepository;
        this.webClient=webClientBuilder.build();
        this.mapper = mapper;
        this.jdbcScheduler = jdbcScheduler;
    }
    public Flux<User>getAll(){
        return Mono.fromCallable(()->{
            List<UserEntity>entityList=repository.findAll();
            List<User>userList=mapper.entityListToApiList(entityList);
            userList.forEach(user -> {
                String url=TASKS_SERVICE_URL+"/users/"+user.getId()+"/tasks";
                List<Task> taskList = webClient.get()
                        .uri(url)
                        .retrieve()
                        .bodyToFlux(Task.class)
                        .log(LOG.getName(), FINE)
                        .onErrorResume(error -> Flux.empty())
                        .collectList()
                        .block();
                user.setTasks(taskList);
            });
            return userList;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }
    public Mono<User> getById(Long userId)
    {
        return Mono.fromCallable(()->{
            Optional<UserEntity> userEntity=repository.findById(userId);
            return internalOptionalGetUser(userEntity);
        }).subscribeOn(jdbcScheduler);
    }
    public Mono<Boolean> existsById(Long userId) {
        return Mono.fromCallable(()-> repository.findById(userId).isPresent()).subscribeOn(jdbcScheduler);
    }
    public Mono<Boolean>getByEmailAndPassword(String email, String password)
    {
        return Mono.fromCallable(()->{
            String hashedPassword=hashString(password);
            Optional<UserEntity> userEntity=repository.findByEmailAndPassword(email,hashedPassword);
            if(userEntity.isPresent())
            {
                return true;
            }
            return false;
        }).subscribeOn(jdbcScheduler);
    }

    public Mono<User> getByEmail(String email)
    {
        return Mono.fromCallable(()->{
            Optional<UserEntity> userEntity=repository.findByEmail(email);
            return internalOptionalGetUser(userEntity);
        }).subscribeOn(jdbcScheduler);
    }

    public Mono<User> register(User user) {
        return Mono.fromCallable(()->{
            String hashedPassword=hashString(user.getPassword());
            user.setPassword(hashedPassword);
            UserEntity userEntity=repository.save(mapper.apiToEntity(user));
            User userApi= mapper.entityToApi( userEntity);
            String url=TASKS_SERVICE_URL+"/users/"+userApi.getId()+"/tasks";
            return populateUserTasks(url, userApi);
        }).subscribeOn(jdbcScheduler);
    }

    public void delete(Long userId) {
        UserEntity userEntity = repository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if(!userEntity.getProjects().isEmpty())
        {
            userEntity.setProjects(new HashSet<>());
            repository.save(userEntity);
        }
        repository.deleteById(userId);
    }

    public Mono<User> suspend(Long userId) {
        if (exists(userId)) {
            return Mono.fromCallable(()->{
                UserEntity retrievedUserEntity=repository.findById(userId).get();
                retrievedUserEntity.setStatus(Status.SUSPEND);
                UserEntity newUserEntity=repository.save(retrievedUserEntity);
                return mapper.entityToApi(newUserEntity);
            });
        }
        return null;
    }

    private String hashString(String stringToHash)
    {
        String securityUrl=SECURITY_SERVICE_URL+"/hashString?stringToHash="+stringToHash;
        return webClient.post()
                .uri(securityUrl)
                .retrieve()
                .bodyToMono(String.class).log(LOG.getName(), FINE)
                .onErrorResume(error -> {
                    System.out.println(error);
                    return Mono.empty();})
                .block();
    }

    private User internalOptionalGetUser(Optional<UserEntity> userEntity) {
        if(userEntity.isPresent()) {
            System.out.println("User projects: ");
            System.out.println(userEntity.get().getProjects());
            User userApi= mapper.entityToApi( userEntity.get());
            String url=TASKS_SERVICE_URL+"/users/"+userApi.getId()+"/tasks";
            return populateUserTasks(url, userApi);
        }
        throw new RuntimeException("User not found");
    }

    private User populateUserTasks(String url, User userApi) {
        List<Task> taskList = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToFlux(Task.class)
                .log(LOG.getName(), FINE)
                .onErrorResume(error -> Flux.empty())
                .collectList()
                .block();
        userApi.setTasks(taskList);
        return userApi;
    }

    private boolean exists(Long userId){
        return repository.existsById(userId);
    }

}

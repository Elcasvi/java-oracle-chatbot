package net.sanchezapps.usersservice.services;

import jakarta.transaction.Transactional;
import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.mappers.ProjectMapper;
import net.sanchezapps.usersservice.persistence.mappers.UserMapper;
import net.sanchezapps.usersservice.persistence.repositories.ProjectRepository;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.List;
import java.util.Set;

import static java.util.logging.Level.FINE;

@Service
public class UserProjectService {
    private final String TASKS_SERVICE_URL="http://tasks-service";

    private static final Logger LOG = LoggerFactory.getLogger(UserProjectService.class);
    private final WebClient webClient;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;
    private final Scheduler jdbcScheduler;

    @Autowired
    public UserProjectService(UserRepository userRepository, ProjectRepository projectRepository, WebClient.Builder webClientBuilder, ProjectMapper projectMapper, UserMapper userMapper,@Qualifier("jdbcScheduler") Scheduler jdbcScheduler) {

        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.webClient=webClientBuilder.build();
        this.projectMapper = projectMapper;
        this.userMapper = userMapper;
        this.jdbcScheduler = jdbcScheduler;
    }

    public Flux<Project>getProjectsOfUser(Long userId)
    {
        return Mono.fromCallable(()->
        {
            var userEntity =userRepository.findById(userId);
            if(userEntity.isPresent())
            {
                List<ProjectEntity>projectEntityList=userEntity.get().getProjects().stream().toList();
                System.out.println("Inside getProjectsOfUser");
                System.out.println(projectEntityList);
                return projectMapper.entityListToApiList(projectEntityList);
            }
            return null;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }

    public Flux<User> getUsersOfProject(Long projectId) {
        return Mono.fromCallable(() -> {
            ProjectEntity projectEntity = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
            System.out.println("Inside getUsersOfProject");
            List<UserEntity> userEntityList = projectEntity.getUsers().stream().toList();
            List<User>userList=userMapper.entityListToApiList(userEntityList);
            System.out.println("User List is empty: " + userList.isEmpty());
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
            System.out.println("Before return");
            return userList;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }
    

    public void assignUserToProject(Long userId, Long projectId) {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        ProjectEntity projectEntity = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        Set<UserEntity> users=projectEntity.getUsers();
        users.add(userEntity);
        projectEntity.setUsers(users);
        projectRepository.save(projectEntity);
    }

    @Transactional
    public Mono<Project> deleteUserFromProject(Long projectId, Long userId) {
        return Mono.fromCallable(() -> {
            ProjectEntity projectEntity = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
            UserEntity userEntity = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            if (projectEntity.getUsers().remove(userEntity)) {
                if(userEntity.getProjects().remove(projectEntity))
                {
                    projectRepository.save(projectEntity);
                    userRepository.save(userEntity);
                }
                else{
                    System.out.println("Project not found in project's user list.");
                }
            }
            else {
                System.out.println("User not found in project's user list.");
            }
            return projectMapper.entityToApi(projectEntity);
        });
    }
}
package net.sanchezapps.usersservice.services;

import jakarta.transaction.Transactional;
import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.mappers.ProjectMapper;
import net.sanchezapps.usersservice.persistence.mappers.UserMapper;
import net.sanchezapps.usersservice.persistence.repositories.ProjectRepository;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.interceptor.CacheOperationInvoker;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserProjectService {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;

    @Autowired
    public UserProjectService(UserRepository userRepository, ProjectRepository projectRepository, ProjectMapper projectMapper, UserMapper userMapper) {

        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.userMapper = userMapper;
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
        }).flatMapMany(Flux::fromIterable);
    }

    public Flux<User> getUsersOfProject(Long projectId) {
        return Mono.fromCallable(() -> {
            var projectEntity = projectRepository.findById(projectId);
            if (projectEntity.isPresent()) {
                List<UserEntity> userEntityList = projectEntity.get().getUsers().stream().toList();
                System.out.println("Inside getUsersOfProject");
                System.out.println(userEntityList);
                return userMapper.entityListToApiListMinimal(userEntityList);
            }
            return null;
        }).flatMapMany(Flux::fromIterable);
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
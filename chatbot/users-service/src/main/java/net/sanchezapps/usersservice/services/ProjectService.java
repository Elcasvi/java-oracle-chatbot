package net.sanchezapps.usersservice.services;

import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.mappers.ProjectMapper;
import net.sanchezapps.usersservice.persistence.repositories.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;

import java.util.*;

import static java.util.logging.Level.FINE;

@Service
public class ProjectService {
    private static final Logger LOG = LoggerFactory.getLogger(ProjectService.class);
    private final ProjectRepository repository;
    private final ProjectMapper mapper;
    private final WebClient webClient;
    private final Scheduler jdbcScheduler;


    @Autowired
    public ProjectService(ProjectRepository repository, ProjectMapper mapper,WebClient.Builder webClientBuilder, @Qualifier("jdbcScheduler") Scheduler jdbcScheduler)
    {
        this.repository=repository;
        this.mapper=mapper;
        this.jdbcScheduler = jdbcScheduler;
        this.webClient=webClientBuilder.build();
    }
    public Flux<Project> getAll()
    {
        return Mono.fromCallable(()->
        {
            List<ProjectEntity> projectEntityList=repository.findAll();
            return mapper.entityListToApiList(projectEntityList);
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }
    public Mono<Project> getById(Long projectId)
    {
        return Mono.fromCallable(()->{
            Optional<ProjectEntity> projectEntity=repository.findById(projectId);
            return internalOptionalGetproject(projectEntity);
        }).subscribeOn(jdbcScheduler);
    }


    public Mono<Project> register(Project project) {
        return Mono.fromCallable(()->{
            ProjectEntity projectEntity=repository.save(mapper.apiToEntity(project));
             return mapper.entityToApi(projectEntity);
        }).subscribeOn(jdbcScheduler);
    }

    public void delete(Long projectId) {
        ProjectEntity projectEntity = repository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        if(!projectEntity.getUsers().isEmpty())
        {
            projectEntity.setUsers(new HashSet<>());
            repository.save(projectEntity);
        }
        repository.deleteById(projectId);

    }

    private Project internalOptionalGetproject(Optional<ProjectEntity> projectEntity) {
        if(projectEntity.isPresent()) {
            return mapper.entityToApi( projectEntity.get());
        }
        throw new RuntimeException("Project not found");
    }
}

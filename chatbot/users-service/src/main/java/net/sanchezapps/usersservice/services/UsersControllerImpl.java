package net.sanchezapps.usersservice.services;

import net.sanchezapps.api.core.users.User;
import net.sanchezapps.api.core.users.UsersController;
import net.sanchezapps.usersservice.persistence.UserEntity;
import net.sanchezapps.usersservice.persistence.UserMapper;
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
public class UsersControllerImpl implements UsersController {
    private final UsersService service;
    private final UserMapper mapper;
    private final Scheduler jdbcScheduler;
    @Autowired
    public UsersControllerImpl(UsersService usersService, UserMapper mapper,@Qualifier("jdbcScheduler") Scheduler jdbcScheduler) {
        this.service = usersService;
        this.mapper = mapper;
        this.jdbcScheduler = jdbcScheduler;
    }

    @Override
    public Flux<User> getAll() {
        return Mono.fromCallable(()->{
            List<UserEntity>entityList=service.getAll();
            List<User>userList=mapper.entityListToApiList(entityList);
            //TODO: Get all tasks of a user
            //userList.forEach(user->user);
            return userList;
        }).flatMapMany(Flux::fromIterable).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<User> getById(Long userId) {
           return Mono.fromCallable(()->{
               Optional<UserEntity>userEntity=service.getById(userId);
               if(userEntity.isPresent()) {
                   return mapper.entityToApi( userEntity.get());
               }
               return null;
           }).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<User> login(String email, String password) {
        return Mono.fromCallable(()->{
            Optional<UserEntity>userEntity=service.getByEmailAndPassword(email,password);
            if(userEntity.isPresent()) {
                return mapper.entityToApi( userEntity.get());
            }
            return null;
        }).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<User> create(User user) {
        return Mono.fromCallable(()->{
            try {
                UserEntity userEntity=mapper.apiToEntity(user);
                UserEntity newUserEntity=service.register(userEntity);
                return mapper.entityToApi(newUserEntity);
            }
            catch(DataIntegrityViolationException dive) {
                throw new RuntimeException("User already exists");
            }
        }).subscribeOn(jdbcScheduler);
    }

    @Override
    public Mono<User> getByEmail(String email) {
        return Mono.fromCallable(()->{
            Optional<UserEntity>userEntity=service.getByEmail(email);
            if(userEntity.isPresent()) {
                return mapper.entityToApi( userEntity.get());
            }
            return null;
        }).subscribeOn(jdbcScheduler);
    }
}

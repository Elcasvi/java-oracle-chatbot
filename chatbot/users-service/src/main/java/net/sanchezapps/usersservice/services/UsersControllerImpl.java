package net.sanchezapps.usersservice.services;

import net.sanchezapps.api.core.users.User;
import net.sanchezapps.api.core.users.UsersController;
import net.sanchezapps.usersservice.persistence.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class UsersControllerImpl implements UsersController {
    private final UsersService service;
    @Autowired
    public UsersControllerImpl(UsersService usersService, UserMapper mapper) {
        this.service = usersService;
    }

    @Override
    public Flux<User> getAll() {
        return service.getAll();
    }

    @Override
    public Mono<User> getById(Long userId) {
          return service.getById(userId);
    }

    @Override
    public Mono<User> login(String email, String password) {
        return service.getByEmailAndPassword(email,password);
    }

    @Override
    public Mono<User> create(User user) {
       return service.register(user);
    }

    @Override
    public Mono<User> getByEmail(String email) {
       return service.getByEmail(email);
    }
}

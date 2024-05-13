package net.sanchezapps.usersservice.controllers;

import net.sanchezapps.api.core.users.User;
import net.sanchezapps.api.core.users.UsersController;
import net.sanchezapps.usersservice.persistence.mappers.UserMapper;
import net.sanchezapps.usersservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = {"https://chatbot.sanchezapps.net","http://localhost:3000"})
public class UsersControllerImpl implements UsersController {
    private final UserService service;
    @Autowired
    public UsersControllerImpl(UserService userService, UserMapper mapper) {
        this.service = userService;
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
    public Mono<Boolean> existsById(Long userId) {
        return service.existsById(userId);
    }

    @Override
    public Mono<Boolean> login(String email, String password) {
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

    //Endpoint DELETE NOSTROS
    @Override
    public void delete(Long userId) {
        service.delete(userId);
    }

    //Endpoint DELETE ENTREGA
    @Override
    public Mono<User> suspend(Long userId) {
        return service.suspend(userId);
    }
}

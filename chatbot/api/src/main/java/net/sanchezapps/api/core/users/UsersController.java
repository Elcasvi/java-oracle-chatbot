package net.sanchezapps.api.core.users;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UsersController {
    @GetMapping(value = "/users")
    Flux<User> getAll();

    @GetMapping(value = "/users/{userId}")
    Mono<User> getById(@PathVariable("userId") Long userId);

    @GetMapping(value = "/users/exists/{userId}")
    Mono<Boolean> existsById(@PathVariable("userId") Long userId);

    @PostMapping(value = "/login")
    Mono<User> login(@RequestParam(value = "email") String email, @RequestParam(value = "password") String password);

    @PostMapping(value = "/users")
    Mono<User> create(@RequestBody User user);

    // Consider separate endpoint for searching by email (if needed)
    @GetMapping(value = "/users/search/byEmail")
    Mono<User> getByEmail(@RequestParam(value = "email") String email);

    //Endpoint DELETE NOSTROS
    @GetMapping(value = "/users/delete")
    void delete(Long userId);

    //Endpoint DELETE ENTREGA
    @GetMapping(value = "/users/suspend")
    Mono<User> suspend();
}

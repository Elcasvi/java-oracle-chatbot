package net.sanchezapps.api.core.users;

import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface UsersController {
    @GetMapping
    List<User> getAllUsers();
    @GetMapping("/{id}")
    User getUserById(@PathVariable int id);
    @PostMapping
    User createUser(@RequestBody User user);
    @PutMapping("/{id}")
    User updateUser(@PathVariable int id, @RequestBody User user);
    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable int id);
}

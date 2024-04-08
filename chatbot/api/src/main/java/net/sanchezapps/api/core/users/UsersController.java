package net.sanchezapps.api.core.users;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping(value = "/api")
public interface UsersController {
    @GetMapping(value = "/users")
    List<User> getAll();

    @GetMapping(value = "/users/{userId}")
    User getById(@PathVariable("userId") Long userId); // Consider using Long for user ID

    // Use dedicated endpoint for login
    @PostMapping(value = "/login")
    User login(@RequestParam(value = "email") String email, @RequestParam(value = "password") String password);

    // Consider separate endpoint for searching by email (if needed)
    @GetMapping(value = "/users/search/byEmail")
     User getByEmail(@RequestParam(value = "email") String email);
}

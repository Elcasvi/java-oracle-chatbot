package net.sanchezapps.api.composite;

import net.sanchezapps.api.core.users.User;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface CompositeController {
    @GetMapping(value = "/user-composite")
    List<User> getAllUsersWithTasks();
}

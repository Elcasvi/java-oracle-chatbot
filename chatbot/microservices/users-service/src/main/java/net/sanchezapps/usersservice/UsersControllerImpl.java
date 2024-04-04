package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.users.User;
import net.sanchezapps.api.core.users.UsersController;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class UsersControllerImpl implements UsersController {

    @Override
    public List<User> getAll() {
        return List.of();
    }

    @Override
    public User getById(Long userId) {
        return null;
    }

    @Override
    public User login(String email, String password) {
        return null;
    }

    @Override
    public User getByEmail(String email) {
        return null;
    }
}

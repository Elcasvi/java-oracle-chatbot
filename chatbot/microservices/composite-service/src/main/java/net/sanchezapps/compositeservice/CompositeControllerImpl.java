package net.sanchezapps.compositeservice;


import net.sanchezapps.api.composite.CompositeController;
import net.sanchezapps.api.core.users.User;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CompositeControllerImpl implements CompositeController {

    @Override
    public List<User> getAllUsersWithTasks()
    {
        return List.of();
    }

}

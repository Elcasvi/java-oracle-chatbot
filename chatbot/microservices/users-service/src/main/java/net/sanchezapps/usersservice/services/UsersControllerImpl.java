package net.sanchezapps.usersservice.services;

import net.sanchezapps.api.core.users.User;
import net.sanchezapps.api.core.users.UsersController;
import net.sanchezapps.usersservice.persistence.UserEntity;
import net.sanchezapps.usersservice.persistence.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class UsersControllerImpl implements UsersController {
    private final UsersService service;
    private final UserMapper mapper;
    @Autowired
    public UsersControllerImpl(UsersService usersService, UserMapper mapper) {
        this.service = usersService;
        this.mapper = mapper;
    }

    @Override
    public List<User> getAll() {
        List<UserEntity>entityList=service.getAll();
        return mapper.entityListToApiList(entityList);
    }

    @Override
    public User getById(Long userId) {
        Optional<UserEntity>userEntity=service.getById(userId);
        if(userEntity.isPresent())
        {
            return mapper.entityToApi(userEntity.get());
        }
        return null;
    }

    @Override
    public User login(String email, String password) {
        Optional<UserEntity>userEntity=service.getByEmailAndPassword(email,password);
        if(userEntity.isPresent())
        {
            return mapper.entityToApi(userEntity.get());
        }
        return null;
    }

    @Override
    public User getByEmail(String email) {
        Optional<UserEntity>userEntity=service.getByEmail(email);
        if(userEntity.isPresent())
        {
            return mapper.entityToApi(userEntity.get());
        }
        return null;
    }
}

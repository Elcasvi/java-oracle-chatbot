package net.sanchezapps.usersservice.persistence.mappers;

import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    public User entityToApi(UserEntity userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setPassword(userEntity.getPassword());
        user.setRole(userEntity.getRole());
        user.setStatus(userEntity.getStatus());
        return user;
    }

    public UserEntity apiToEntity(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setRole(user.getRole());
        userEntity.setStatus(user.getStatus());
        return userEntity;
    }

    public List<User> entityListToApiList(List<UserEntity> userEntities) {
        List<User> users = new ArrayList<>();
        for (UserEntity userEntity : userEntities) {
            users.add(entityToApi(userEntity));
        }
        return users;
    }

    // Hacer que el project solo regrese id, name, rol
    public User entityToApiMinimal(UserEntity userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setRole(userEntity.getRole());
        return user;
    }

    public List<User> entityListToApiListMinimal(List<UserEntity> userEntities) {
        return userEntities.stream()
                            .map(this::entityToApiMinimal)
                            .collect(Collectors.toList());
    }
}

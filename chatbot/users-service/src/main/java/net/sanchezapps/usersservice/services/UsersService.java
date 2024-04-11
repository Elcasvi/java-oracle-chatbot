package net.sanchezapps.usersservice.services;


import net.sanchezapps.usersservice.persistence.UserEntity;
import net.sanchezapps.usersservice.persistence.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository repository;
    @Autowired
    public UsersService(UsersRepository repository) {
        this.repository = repository;
    }
    public List<UserEntity>getAll(){
        return repository.findAll();
    }
    public Optional<UserEntity> getById(Long userId)
    {
        return repository.findById(userId);
    }
    public Optional<UserEntity>getByEmailAndPassword(String email, String password)
    {
        return repository.findByEmailAndPassword(email,password);
    }
    public Optional<UserEntity>getByEmail(String email)
    {
        return repository.findByEmail(email);
    }

    public UserEntity register(UserEntity user) {
        return repository.save(user);
    }
}

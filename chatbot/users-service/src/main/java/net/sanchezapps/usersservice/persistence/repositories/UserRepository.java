package net.sanchezapps.usersservice.persistence.repositories;


import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity>findByEmailAndPassword(String email, String password);

    Optional<UserEntity> findByEmail(String email);
}
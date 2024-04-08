package net.sanchezapps.usersservice.persistence;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity>findByEmailAndPassword(String email, String password);

    Optional<UserEntity> findByEmail(String email);
}
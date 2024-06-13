package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.users.Role;
import net.sanchezapps.api.core.users.Status;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PersistenceTests extends OracleDbTestBase{
//    @Autowired
//    private UserRepository repository;
//    private UserEntity savedEntity;
//
//    @BeforeEach
//    void setUpDb(){
//        repository.deleteAll();
//        UserEntity entity = new UserEntity(
//                1L,
//                "John Doe",
//                "john.doe@example.com",
//                "password123",
//                Role.DEVELOPER,
//                Status.ACTIVE,
//                new HashSet<>()
//        );
//        savedEntity=repository.save(entity);
//        assertEqualsUser(entity,savedEntity);
//    }
//    @AfterEach
//    void tearDownDb(){
//        repository.deleteAll();
//    }
//    @Test
//    void create()
//    {
//        UserEntity newEntity = new UserEntity(
//                2L,
//                "John Doe",
//                "john.doe2@example.com",
//                "password123",
//                Role.DEVELOPER,
//                Status.ACTIVE,
//                new HashSet<>()
//        );
//        repository.save(newEntity);
//
//        UserEntity foundEntity = repository.findById(savedEntity.getId()).get();
//        assertEqualsUser(newEntity,foundEntity);
//    }
//    @Test
//    void update(){
//
//        savedEntity.setName("John Doe Updated");
//        repository.save(savedEntity);
//
//        UserEntity foundEntity = repository.findById(savedEntity.getId()).get();
//        assertEquals("John Doe Updated",foundEntity.getName());
//    }
//
//    @Test
//    void delete()
//    {
//        repository.delete(savedEntity);
//        assertFalse(repository.existsById(savedEntity.getId()));
//    }
//    @Test
//    void getUserById()
//    {
//        UserEntity userEntity=repository.findById(savedEntity.getId()).get();
//        assertEqualsUser(savedEntity,userEntity);
//    }
//    @Test
//    void duplicateError()
//    {
//        assertThrows(DataIntegrityViolationException.class,()->{
//            UserEntity entity = new UserEntity(
//                    1L,
//                    "John Doe",
//                    "john.doe@example.com",
//                    "password123",
//                    Role.DEVELOPER,
//                    Status.ACTIVE,
//                    new HashSet<>()
//            );
//            repository.save(entity);
//        });
//    }
//
//    private void assertEqualsUser(UserEntity expectedEntity, UserEntity actualEntity) {
//        assertEquals(expectedEntity.getName(),actualEntity.getName());
//        assertEquals(expectedEntity.getRole(),actualEntity.getRole());
//        assertEquals(expectedEntity.getStatus(),actualEntity.getStatus());
//    }
}
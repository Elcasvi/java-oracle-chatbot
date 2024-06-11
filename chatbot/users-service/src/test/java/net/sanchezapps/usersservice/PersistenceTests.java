package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.users.Role;
import net.sanchezapps.api.core.users.Status;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PersistenceTests extends OracleDbTestBase{
    @Autowired
    private UserRepository repository;
    private UserEntity savedEntity;

    @BeforeEach
    void setUpDb(){
        repository.deleteAll();
        UserEntity entity = new UserEntity(
                1L,
                "John Doe",
                "john.doe@example.com",
                "password123",
                Role.DEVELOPER,
                Status.ACTIVE,
                new HashSet<>()
        );
        savedEntity=repository.save(entity);
        assertEqualsUser(entity,savedEntity);
    }
    @Test
    void create()
    {
        UserEntity entity = new UserEntity(
                1L,
                "John Doe",
                "john.doe@example.com",
                "password123",
                Role.DEVELOPER,
                Status.ACTIVE,
                new HashSet<>()
        );
        repository.save(entity);

        UserEntity foundEntity = repository.findById(savedEntity.getId()).get();
        assertEquals(2,repository.count());


    }
    @Test
    void update(){

        savedEntity.setName("John Doe Updated");
        repository.save(savedEntity);

        UserEntity foundEntity = repository.findById(savedEntity.getId()).get();
        assertEquals(1,(long)foundEntity.getId());
        assertEquals("John Doe Updated",foundEntity.getName());
    }

    @Test
    void delete()
    {
        repository.delete(savedEntity);
        assertFalse(repository.existsById(savedEntity.getId()));
    }
    @Test
    void getUserById()
    {
        UserEntity userEntity=repository.findById(savedEntity.getId()).get();
        assertEqualsUser(savedEntity,userEntity);
    }
    @Test
    void duplicateError()
    {
        assertThrows(DataIntegrityViolationException.class,()->{
            UserEntity entity = new UserEntity(
                    1L,
                    "John Doe",
                    "john.doe@example.com",
                    "password123",
                    Role.DEVELOPER,
                    Status.ACTIVE,
                    new HashSet<>()
            );
            repository.save(entity);
        });
    }

    @Test
    void optimisticLockError()
    {
        // Store the saved entity in two separate entity objects
        UserEntity entity1=repository.findById(savedEntity.getId()).get();
        UserEntity entity2=repository.findById(savedEntity.getId()).get();

        // Update the entity using the first entity object
        entity1.setName("Test Name 1");
        repository.save(entity1);

        // Update the entity using the second entity object.
        // This should fail since the second entity now holds an old version number, i.e. an Optimistic Lock Error
        assertThrows(OptimisticLockingFailureException.class,()->{
            entity2.setName("Test Name 2");
            repository.save(entity2);
        });
        // Get the updated entity from the database and verify its new sate
        UserEntity updatedEntity=repository.findById(savedEntity.getId()).get();
        assertEquals(1,(Long)updatedEntity.getId());
        assertEquals("Test Name 1",updatedEntity.getName());
    }

    private void assertEqualsUser(UserEntity expectedEntity, UserEntity actualEntity) {
        assertEquals(expectedEntity.getId(), actualEntity.getId());
        assertEquals(expectedEntity.getName(),actualEntity.getName());
        assertEquals(expectedEntity.getEmail(),actualEntity.getEmail());
        assertEquals(expectedEntity.getRole(),actualEntity.getRole());
        assertEquals(expectedEntity.getStatus(),actualEntity.getStatus());
    }
}
package net.sanchezapps.tasksservice;


import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TasksRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PersistenceTests extends OracleDbTestBase{
    @Autowired
    private TasksRepository repository;
    private TaskEntity savedEntity;

    @BeforeEach
    void setUpDb() {
        repository.deleteAll();
        TaskEntity entity = new TaskEntity();
        entity.setName("Task 1");
        entity.setDescription("Description 1");
        entity.setLastUpdated(new Date());
        entity.setPriority(TaskPriority.HIGH);
        entity.setState(TaskState.IN_PROGRESS);
        entity.setUserId(1L);

        savedEntity = repository.save(entity);
        assertEqualsTask(entity, savedEntity);
    }
    @AfterEach
    void tearDownDb() {
        repository.deleteAll();
    }

    @Test
    void create() {
        TaskEntity newEntity = new TaskEntity();
        newEntity.setName("Task 1");
        newEntity.setDescription("Description 1");
        newEntity.setLastUpdated(new Date());
        newEntity.setPriority(TaskPriority.HIGH);
        newEntity.setState(TaskState.IN_PROGRESS);
        newEntity.setUserId(1L);
        repository.save(newEntity);

        TaskEntity foundEntity = repository.findById(savedEntity.getId()).get();
        assertEqualsTask(newEntity, foundEntity);
    }

    @Test
    void update() {
        savedEntity.setName("Task 1 Updated");
        repository.save(savedEntity);

        TaskEntity foundEntity = repository.findById(savedEntity.getId()).get();
        assertEquals("Task 1 Updated", foundEntity.getName());
    }

    @Test
    void delete() {
        repository.delete(savedEntity);
        assertFalse(repository.existsById(savedEntity.getId()));
    }

    @Test
    void getTaskById() {
        TaskEntity taskEntity = repository.findById(savedEntity.getId()).get();
        assertEqualsTask(savedEntity, taskEntity);
    }

    private void assertEqualsTask(TaskEntity expectedEntity, TaskEntity actualEntity) {
        assertEquals(expectedEntity.getName(), actualEntity.getName());
        assertEquals(expectedEntity.getDescription(), actualEntity.getDescription());
        assertEquals(expectedEntity.getPriority(), actualEntity.getPriority());
        assertEquals(expectedEntity.getState(), actualEntity.getState());
        assertEquals(expectedEntity.getUserId(), actualEntity.getUserId());
    }
}
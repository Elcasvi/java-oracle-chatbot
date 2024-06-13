package net.sanchezapps.tasksservice;

import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TasksRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static reactor.core.publisher.Mono.just;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TasksServiceApplicationTests {

//    @Autowired
//    private WebTestClient client;
//
//    @Autowired
//    private TasksRepository repository;
//
//    @BeforeEach
//    void setupDb() {
//        repository.deleteAll();
//    }
//
//    @AfterEach
//    void tearDownDb() {
//        repository.deleteAll();
//    }
//
//    @Test
//    void getTaskById() {
//        TaskEntity savedTask = repository.save(new TaskEntity(
//                0L,
//                "Sample Task",
//                "Description of Sample Task",
//                new Date(),
//                TaskPriority.HIGH,
//                TaskState.TODO,
//                1L
//        ));
//
//        getAndVerifyTaskById(savedTask.getId(), HttpStatus.OK)
//                .jsonPath("$.id").isEqualTo(savedTask.getId());
//    }
//
////    @Test
////    void createTask() {
////        Long taskId = 1L;
////        assertFalse(repository.findById(taskId).isPresent(), "Task should not exist before posting");
////
////        postAndVerifyTask(taskId, HttpStatus.OK);
////
////        assertTrue(repository.findById(taskId).isPresent(), "Task should exist after posting");
////    }
//
//    @Test
//    void deleteTask() {
//        TaskEntity savedTask = repository.save(new TaskEntity(
//                0L,
//                "Sample Task",
//                "Description of Sample Task",
//                new Date(),
//                TaskPriority.HIGH,
//                TaskState.TODO,
//                1L
//        ));
//
//        deleteTaskById(savedTask.getId(), HttpStatus.OK);
//
//        assertFalse(repository.existsById(savedTask.getId()), "Task should not exist after deletion");
//    }
//
//    @Test
//    void updateTask() {
//        TaskEntity savedTask = repository.save(new TaskEntity(
//                0L,
//                "Sample Task",
//                "Description of Sample Task",
//                new Date(),
//                TaskPriority.HIGH,
//                TaskState.TODO,
//                1L
//        ));
//
//        savedTask.setName("Updated Task Name");
//
//        updateAndVerifyTask(savedTask.getId(), savedTask, HttpStatus.OK)
//                .jsonPath("$.name").isEqualTo("Updated Task Name");
//    }
//
//    // Auxiliary functions-----------------------------------------------------------------------------------------------
//
//    private WebTestClient.BodyContentSpec getAndVerifyTaskById(Long taskId, HttpStatus expectedStatus) {
//        return client.get()
//                .uri("/tasks/" + taskId)
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus)
//                .expectHeader().contentType(APPLICATION_JSON)
//                .expectBody();
//    }
//
//    private WebTestClient.BodyContentSpec postAndVerifyTask(Long taskId, HttpStatus expectedStatus) {
//        TaskEntity task = new TaskEntity(
//                0L,
//                "Sample Task",
//                "Description of Sample Task",
//                new Date(),
//                TaskPriority.HIGH,
//                TaskState.TODO,
//                62L
//        );
//        return client.post()
//                .uri("/task")
//                .body(just(task), TaskEntity.class)
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus)
//                .expectHeader().contentType(APPLICATION_JSON)
//                .expectBody();
//    }
//
//    private void deleteTaskById(Long taskId, HttpStatus expectedStatus) {
//        client.delete()
//                .uri("/task/" + taskId)
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus);
//    }
//
//    private WebTestClient.BodyContentSpec updateAndVerifyTask(Long taskId, TaskEntity task, HttpStatus expectedStatus) {
//        return client.put()
//                .uri("/task/" + taskId)
//                .body(just(task), TaskEntity.class)
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus)
//                .expectHeader().contentType(APPLICATION_JSON)
//                .expectBody();
//    }
}

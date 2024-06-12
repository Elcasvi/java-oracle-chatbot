package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.users.Role;
import net.sanchezapps.api.core.users.Status;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static reactor.core.publisher.Mono.just;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UsersServiceApplicationTests {

//    @Autowired
//    private WebTestClient client;
//
//    @Autowired
//    private UserRepository repository;
//
//    @BeforeEach
//    void setupDb() {
//        repository.deleteAll();
//    }
//    @AfterEach
//    void tearDownDb() {
//        repository.deleteAll();
//    }
//
//    @Test
//    void getUsersByEmail() {
//        String email="john.doe@example.com";
//        assertFalse(repository.findByEmail(email).isPresent(), "User should not exist before posting");
//
//        postAndVerifyUser(email,HttpStatus.OK);
//
//        // Reload the entity from the database to ensure it's saved
//        assertTrue(repository.findByEmail("john.doe@example.com").isPresent(), "User should exist after posting");
//
//        getAndVerifyUserByEmail(email, HttpStatus.OK)
//                .jsonPath("$.email").isEqualTo(email);
//    }
//
//    @Test
//    void createUser() {
//        String email = "jane.doe@example.com";
//        assertFalse(repository.findByEmail(email).isPresent(), "User should not exist before posting");
//
//        postAndVerifyUser(email, HttpStatus.OK);
//
//        assertTrue(repository.findByEmail(email).isPresent(), "User should exist after posting");
//    }
//
//
//    @Test
//    void deleteUser() {
//        UserEntity savedUser = repository.save(new UserEntity(
//                0L,
//                "Jane Doe",
//                "jane.doe@example.com",
//                "password123",
//                Role.DEVELOPER,
//                Status.ACTIVE,
//                new HashSet<>()
//        ));
//
//        deleteUserById(savedUser.getId(), HttpStatus.OK);
//
//        assertFalse(repository.existsById(savedUser.getId()), "User should not exist after deletion");
//    }
//
//    @Test
//    void suspendUser() {
//        UserEntity savedUser = repository.save(new UserEntity(
//                0L,
//                "Jane Doe",
//                "jane.doe@example.com",
//                "password123",
//                Role.DEVELOPER,
//                Status.ACTIVE,
//                new HashSet<>()
//        ));
//
//        suspendAndVerifyUserById(savedUser.getId(), HttpStatus.OK)
//                .jsonPath("$.status").isEqualTo(Status.SUSPEND.toString());
//    }
//
//    // Auxiliary functions-----------------------------------------------------------------------------------------------
//
//    private WebTestClient.BodyContentSpec getAndVerifyUserByEmail(String email, HttpStatus expectedStatus) {
//        return client.get()
//                .uri(uriBuilder -> uriBuilder.path("/users/search/byEmail")
//                        .queryParam("email", email)
//                        .build())
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus)
//                .expectHeader().contentType(APPLICATION_JSON)
//                .expectBody();
//    }
//
//    private WebTestClient.BodyContentSpec postAndVerifyUser(String email,HttpStatus expectedStatus) {
//        UserEntity user = new UserEntity(
//                0L,
//                "John Doe",
//                email,
//                null,
//                Role.DEVELOPER,
//                Status.ACTIVE,
//                new HashSet<>()
//        );
//        return client.post()
//                .uri("/users")
//                .body(just(user), UserEntity.class)
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus)
//                .expectHeader().contentType(APPLICATION_JSON)
//                .expectBody();
//    }
//
//    private void deleteUserById(Long userId, HttpStatus expectedStatus) {
//        client.delete()
//                .uri(uriBuilder -> uriBuilder.path("/users/delete")
//                        .queryParam("userId", userId)
//                        .build())
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus);
//    }
//
//    private WebTestClient.BodyContentSpec suspendAndVerifyUserById(Long userId, HttpStatus expectedStatus) {
//        return client.put()
//                .uri("/users/suspend/" + userId)
//                .accept(APPLICATION_JSON)
//                .exchange()
//                .expectStatus().isEqualTo(expectedStatus)
//                .expectHeader().contentType(APPLICATION_JSON)
//                .expectBody();
//    }
}
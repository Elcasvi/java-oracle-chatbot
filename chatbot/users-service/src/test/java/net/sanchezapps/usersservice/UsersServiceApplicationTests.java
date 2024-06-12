package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.users.Role;
import net.sanchezapps.api.core.users.Status;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static reactor.core.publisher.Mono.just;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class UsersServiceApplicationTests {

    @Autowired
    private WebTestClient client;

    @Autowired
    private UserRepository repository;

    @BeforeEach
    void setupDb() {
        repository.deleteAll();
    }
    @Test
    void getUsersByUserId() {

        Long userId = 1L;

        assertEquals(0, repository.findById(userId).stream().count());

        postAndVerifyReview(userId,OK);

        assertEquals(1, repository.findById(userId).stream().count());

        getAndVerifyReviewsByProductId(userId, OK)
                .jsonPath("$.length()").isEqualTo(1)
                .jsonPath("$[0].userId").isEqualTo(userId);
    }

    //Auxiliary functions

    private WebTestClient.BodyContentSpec getAndVerifyReviewsByProductId(Long userId, HttpStatus expectedStatus) {
        return getAndVerifyReviewsByProductId("?userId=" + userId, expectedStatus);
    }

    private WebTestClient.BodyContentSpec getAndVerifyReviewsByProductId(String productIdQuery, HttpStatus expectedStatus) {
        return client.get()
                .uri("/review" + productIdQuery)
                .accept(APPLICATION_JSON)
                .exchange()
                .expectStatus().isEqualTo(expectedStatus)
                .expectHeader().contentType(APPLICATION_JSON)
                .expectBody();
    }

    private WebTestClient.BodyContentSpec postAndVerifyReview(Long userId, HttpStatus expectedStatus) {
        UserEntity user = new UserEntity(
                userId,
                "John Doe",
                "john.doe@example.com",
                "password123",
                Role.DEVELOPER,
                Status.ACTIVE,
                new HashSet<>()
        );
        return client.post()
                .uri("/review")
                .body(just(user), User.class)
                .accept(APPLICATION_JSON)
                .exchange()
                .expectStatus().isEqualTo(expectedStatus)
                .expectHeader().contentType(APPLICATION_JSON)
                .expectBody();
    }

    @Test
    void contextLoads() {
    }

}

package net.sanchezapps.securityservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SecurityServiceApplicationTests {
    @Autowired
    private WebTestClient client;

    @Test
    void contextLoads() {
        // Just checking if the context loads
    }

    @Test
    void hashString() {
        String stringToHash = "password123";

        client.post()
                .uri(uriBuilder -> uriBuilder.path("/hashString")
                        .queryParam("stringToHash", stringToHash)
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .consumeWith(response -> {
                    String hashedString = response.getResponseBody();
                    assertNotNull(hashedString, "Hashed string should not be null");
                });
    }

    @Test
    void compareHash() {
        String string1 = "password123";
        String string2 = "password123";

        client.get()
                .uri(uriBuilder -> uriBuilder.path("/compareHash")
                        .queryParam("string1", string1)
                        .queryParam("string2", string2)
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Boolean.class)
                .consumeWith(response -> {
                    Boolean areEqual = response.getResponseBody();
                    assertTrue(areEqual, "The hashed strings should be equal");
                });
    }

    @Test
    void hashAndCompare() {
        String string1 = "password123";
        String string2 = "password123";

        client.get()
                .uri(uriBuilder -> uriBuilder.path("/hashAndCompare")
                        .queryParam("string1", string1)
                        .queryParam("string2", string2)
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Boolean.class)
                .consumeWith(response -> {
                    Boolean areEqual = response.getResponseBody();
                    assertTrue(areEqual, "The strings should match after hashing and comparison");
                });
    }

}

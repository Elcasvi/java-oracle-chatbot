package net.sanchezapps.usersservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

@SpringBootApplication
public class UsersServiceApplication {
    @Bean
    public WebClient.Builder webClient() {
        return WebClient.builder();
    }

    @Bean
    public Scheduler jdbcScheduler() {
        int threadPoolSize = 10;
        int taskQueueSize = 100;
        return Schedulers.newBoundedElastic(threadPoolSize, taskQueueSize, "jdbc-pool");
    }


    public static void main(String[] args) {
        SpringApplication.run(UsersServiceApplication.class, args);
    }

}

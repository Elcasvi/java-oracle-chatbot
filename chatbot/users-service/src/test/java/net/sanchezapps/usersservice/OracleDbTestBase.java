package net.sanchezapps.usersservice;

import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.oracle.OracleContainer;

public abstract class OracleDbTestBase {
    private static final OracleContainer oracle = new OracleContainer("gvenzl/oracle-free:slim-faststart")
            .withDatabaseName("testDB")
            .withUsername("testUser")
            .withPassword("testPassword");
    static{
        oracle.start();
    }
    @DynamicPropertySource
    static void databaseProperties(org.springframework.test.context.DynamicPropertyRegistry registry){
        registry.add("spring.datasource.url", oracle::getJdbcUrl);
        registry.add("spring.datasource.username", oracle::getUsername);
        registry.add("spring.datasource.password", oracle::getPassword);
    }
}

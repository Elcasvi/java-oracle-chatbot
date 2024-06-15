package net.sanchezapps.tasksservice;

import org.testcontainers.containers.PostgreSQLContainer;


public abstract class OracleDbTestBase {
   // private static final OracleContainer db = new OracleContainer("gvenzl/oracle-free:23-slim-faststart").withStartupTimeoutSeconds(300);
   static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16-alpine");

    static{
        db.start();
    }

}

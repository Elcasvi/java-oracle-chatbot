package net.sanchezapps.usersservice;

import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.oracle.OracleContainer;


public abstract class OracleDbTestBase {
    //private static final OracleContainer db = new OracleContainer("gvenzl/oracle-free:23-slim-faststart").withStartupTimeoutSeconds(300);
    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16-alpine");



    static{
        db.start();
    }

}

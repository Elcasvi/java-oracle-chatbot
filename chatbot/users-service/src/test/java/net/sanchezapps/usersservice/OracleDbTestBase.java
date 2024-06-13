package net.sanchezapps.usersservice;

import org.testcontainers.oracle.OracleContainer;


public abstract class OracleDbTestBase {
    private static final OracleContainer db = new OracleContainer("gvenzl/oracle-free:23-slim-faststart").withStartupTimeoutSeconds(300);



    static{
        db.start();
    }

}

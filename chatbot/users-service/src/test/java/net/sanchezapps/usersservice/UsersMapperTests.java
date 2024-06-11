package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.api.core.users.Role;
import net.sanchezapps.api.core.users.Status;
import net.sanchezapps.api.core.users.User;
import net.sanchezapps.usersservice.persistence.entities.UserEntity;
import net.sanchezapps.usersservice.persistence.mappers.UserMapper;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class UsersMapperTests {
    private final UserMapper mapper=new UserMapper();

    @Test
    void mapperTest()
    {
        assertNotNull(mapper);
        List<Task> tasks= List.of(new Task(1L, "TestName", "TestDescription", new Date(), TaskPriority.HIGH, TaskState.IN_PROGRESS, 1L));
        User api=new User(1L,"TestUserName","TestUserEmail","TestUserPassword",Role.DEVELOPER, Status.ACTIVE,tasks);
        UserEntity entity=mapper.apiToEntity(api);

        assertEquals(api.getId(),entity.getId());
        assertEquals(api.getName(),entity.getName());
        assertEquals(api.getEmail(),entity.getEmail());
        assertEquals(api.getPassword(),entity.getPassword());
        assertEquals(api.getRole(),entity.getRole());
        assertEquals(api.getStatus(),entity.getStatus());

        User api2=mapper.entityToApi(entity);
        assertEquals(api.getId(),api2.getId());
        assertEquals(api.getName(),api2.getName());
        assertEquals(api.getEmail(),api2.getEmail());
        assertEquals(api.getPassword(),api2.getPassword());
        assertEquals(api.getRole(),api2.getRole());
        assertEquals(api.getStatus(),api2.getStatus());

        assertNull(api2.getTasks());
        assertNull(entity.getProjects());
    }

    @Test
    void mapperList()
    {
        assertNotNull(mapper);
        //TODO: FILL API OBJECT WITH DATA
        User api=new User();
        List<User>apiList= Collections.singletonList(api);

        List<UserEntity>entityList=mapper.apiListToEntityList(apiList);
        assertEquals(apiList.size(),entityList.size());

        UserEntity entity=entityList.get(0);

        assertEquals(api.getId(),entity.getId());
        assertEquals(api.getName(),entity.getName());
        assertEquals(api.getEmail(),entity.getEmail());
        assertEquals(api.getPassword(),entity.getPassword());
        assertEquals(api.getRole(),entity.getRole());
        assertEquals(api.getStatus(),entity.getStatus());

        List<User>apiList2=mapper.entityListToApiList(entityList);
        assertEquals(apiList.size(),apiList2.size());

        User api2=apiList2.get(0);

        assertEquals(api.getId(),api2.getId());
        assertEquals(api.getName(),api2.getName());
        assertEquals(api.getEmail(),api2.getEmail());
        assertEquals(api.getPassword(),api2.getPassword());
        assertEquals(api.getRole(),api2.getRole());
        assertEquals(api.getStatus(),api2.getStatus());

        assertNull(api.getTasks());
        assertNull(entity.getProjects());
    }
}

package net.sanchezapps.tasksservice;

import net.sanchezapps.api.core.tasks.Task;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;
import net.sanchezapps.tasksservice.persistence.TaskEntity;
import net.sanchezapps.tasksservice.persistence.TaskMapper;
import org.junit.Test;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


public class MapperTests {
    private final TaskMapper mapper = new TaskMapper();
    @Test
    public void mapperTest()
    {
        assertNotNull(mapper);
        Task api=new Task(1L,"TaskName","TaskDesc",new Date(), TaskPriority.HIGH, TaskState.IN_PROGRESS,1L);
        TaskEntity entity=mapper.apiToEntity(api);

        assertEquals(api.getId(),entity.getId());
        assertEquals(api.getName(),entity.getName());
        assertEquals(api.getDescription(),entity.getDescription());
        assertEquals(api.getLastUpdated(),entity.getLastUpdated());
        assertEquals(api.getPriority(),entity.getPriority());
        assertEquals(api.getState(),entity.getState());

        Task api2=mapper.entityToApi(entity);
        assertEquals(api.getId(),api2.getId());
        assertEquals(api.getName(),api2.getName());
        assertEquals(api.getDescription(),api2.getDescription());
        assertEquals(api.getLastUpdated(),api2.getLastUpdated());
        assertEquals(api.getPriority(),api2.getPriority());
        assertEquals(api.getState(),api2.getState());
    }
    @Test
    public void mapperList()
    {
        assertNotNull(mapper);
        Task api=new Task(1L,"TaskName","TaskDesc",new Date(), TaskPriority.HIGH, TaskState.IN_PROGRESS,1L);
        List<Task>apiList= Collections.singletonList(api);

        List<TaskEntity>entityList=mapper.apiListToEntityList(apiList);
        assertEquals(apiList.size(),entityList.size());

        TaskEntity entity=entityList.get(0);

        assertEquals(api.getId(),entity.getId());
        assertEquals(api.getName(),entity.getName());
        assertEquals(api.getDescription(),entity.getDescription());
        assertEquals(api.getLastUpdated(),entity.getLastUpdated());
        assertEquals(api.getPriority(),entity.getPriority());
        assertEquals(api.getState(),entity.getState());

        List<Task>apiList2=mapper.entityListToApiList(entityList);
        assertEquals(apiList.size(),apiList2.size());

        Task api2=apiList2.get(0);

        assertEquals(api.getId(),api2.getId());
        assertEquals(api.getName(),api2.getName());
        assertEquals(api.getDescription(),api2.getDescription());
        assertEquals(api.getLastUpdated(),api2.getLastUpdated());
        assertEquals(api.getPriority(),api2.getPriority());
        assertEquals(api.getState(),api2.getState());

    }
}

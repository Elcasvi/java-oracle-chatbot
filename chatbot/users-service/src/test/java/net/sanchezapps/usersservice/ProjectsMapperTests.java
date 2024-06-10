package net.sanchezapps.usersservice;

import net.sanchezapps.api.core.projects.Project;
import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import net.sanchezapps.usersservice.persistence.mappers.ProjectMapper;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


public class ProjectsMapperTests {
    private final ProjectMapper mapper=new ProjectMapper();

    @Test
    void mapperTest()
    {
        assertNotNull(mapper);
        //TODO: FILL API OBJECT WITH DATA
        Project api=new Project();
        ProjectEntity entity=mapper.apiToEntity(api);

        assertEquals(api.getId(),entity.getId());
        assertEquals(api.getName(),entity.getName());
        assertEquals(api.getManagerId(),entity.getManagerId());


        Project api2=mapper.entityToApi(entity);
        assertEquals(api.getId(),api2.getId());
        assertEquals(api.getName(),api2.getName());
        assertEquals(api.getManagerId(),api2.getManagerId());

        assertNull(entity.getUsers());
    }
    @Test
    void mapperList() {
        assertNotNull(mapper);
        //TODO: FILL API OBJECT WITH DATA
        Project api=new Project();
        List<Project>apiList= Collections.singletonList(api);

        List<ProjectEntity> entityList=mapper.apiListToEntityList(apiList);
        assertEquals(apiList.size(),entityList.size());

        ProjectEntity entity=entityList.get(0);

        assertEquals(api.getManagerId(),entity.getManagerId());
        assertEquals(api.getName(),entity.getName());
        assertEquals(api.getId(),entity.getId());


        List<Project>apiList2=mapper.entityListToApiList(entityList);
        assertEquals(apiList.size(),apiList2.size());

        Project api2=apiList2.get(0);

        assertEquals(api.getManagerId(),api2.getManagerId());
        assertEquals(api.getName(),api2.getName());
        assertEquals(api.getId(),api2.getId());

        assertNull(entity.getUsers());
    }
}

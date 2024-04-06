package net.sanchezapps.tasksservice.persistence;

import net.sanchezapps.api.core.tasks.Task;
import org.mapstruct.*;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskMapper {

    Task entityToApi(TaskEntity taskEntity);
    TaskEntity apiToEntity(Task task);
    List<Task> entityListToApiList(List<TaskEntity> entity);
    List<TaskEntity> apiListToEntityList(List<Task> api);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TaskEntity partialUpdate(Task task, @MappingTarget TaskEntity taskEntity);
}
package net.sanchezapps.usersservice.persistence;

import net.sanchezapps.api.core.users.User;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    @Mappings({
            @Mapping(target = "tasks",ignore = true)
    })
    User entityToApi(UserEntity userEntity);
    UserEntity apiToEntity(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    UserEntity partialUpdate(User user, @MappingTarget UserEntity userEntity);
}
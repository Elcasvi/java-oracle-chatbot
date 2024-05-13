package net.sanchezapps.usersservice.persistence.repositories;

import net.sanchezapps.usersservice.persistence.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

}

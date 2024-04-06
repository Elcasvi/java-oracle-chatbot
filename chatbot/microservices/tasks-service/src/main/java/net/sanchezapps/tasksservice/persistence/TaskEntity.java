package net.sanchezapps.tasksservice.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.sanchezapps.api.core.tasks.TaskPriority;
import net.sanchezapps.api.core.tasks.TaskState;


import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TASKS", indexes = {
        @Index(name = "idx_taskentity_user_id", columnList = "USER_ID"),
        @Index(name = "idx_taskentity_priority_state", columnList = "priority, state")
})
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private Long id;
    private String name;
    private String description;
    private Date lastUpdated;
    private TaskPriority priority;
    private TaskState state;
    @Column(name = "USER_ID", nullable = false)
    private Long userId;
}

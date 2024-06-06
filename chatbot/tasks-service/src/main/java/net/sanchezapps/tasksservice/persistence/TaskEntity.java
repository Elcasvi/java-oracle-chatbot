package net.sanchezapps.tasksservice.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
        @Index(name = "idx_taskentity_priority_state", columnList = "priority, state")
})
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true, nullable = false)
    private Long id;
    @NotBlank
    @Size(max = 255)
    private String name;
    @NotBlank
    @Size(max = 255)
    private String description;
    private Date lastUpdated;
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    @Enumerated(EnumType.STRING)
    private TaskState state;
    @Column(name = "USER_ID", nullable = false)
    private Long userId;
}

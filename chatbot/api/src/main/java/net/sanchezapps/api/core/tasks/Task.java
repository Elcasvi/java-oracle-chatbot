package net.sanchezapps.api.core.tasks;


import lombok.*;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Task {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Date lastUpdated;
    private TaskPriority priority;
    private TaskState state;
}

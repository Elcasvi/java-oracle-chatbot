package net.sanchezapps.api.core.projects;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Project {
    private Long id;
    private String name;
    private Long managerId;
}

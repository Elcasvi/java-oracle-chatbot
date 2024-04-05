package net.sanchezapps.api.core.users;

import lombok.*;
import net.sanchezapps.api.core.tasks.Task;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class User{
    private Long id;
    private String name;
    private String email;
    private String password;
    private Role role;
    private List<Task> tasks;
}

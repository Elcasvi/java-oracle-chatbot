package net.sanchezapps.usersservice.persistence;

import jakarta.persistence.*;
import lombok.*;
import net.sanchezapps.api.core.users.Role;
import net.sanchezapps.api.core.users.Status;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@ToString
@Table(name = "USERS")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Long id;
    private String name;
    @Column(name = "email",unique = true,nullable = false)
    private String email;
    private String password;
    private Role role;
    private Status status;
}

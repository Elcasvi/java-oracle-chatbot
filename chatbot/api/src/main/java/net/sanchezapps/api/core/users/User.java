package net.sanchezapps.api.core.users;

import net.sanchezapps.api.core.tasks.Task;

import java.util.List;

public class User{
    private int id;
    private String name;
    private String email;
    private String password;
    private Role role;
    private List<Task> tasks;

    public User() {
    }

    public User(String email, int id, String name, String password, Role role, List<Task> tasks) {
        this.email = email;
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.tasks = tasks;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", tasks=" + tasks +
                '}';
    }
}

package net.sanchezapps.tasksservice.persistence;

import jakarta.persistence.*;


import java.util.Date;

@Entity
@Table(name = "TASKS")
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique=true, nullable = false)
    private Long id;
    private String name;
    private String description;
    private Date lastUpdated;
    private String priority;
    private String state;
    @Column(name = "USER_ID",unique=true, nullable = false)
    private Long userId;

    public TaskEntity()
    {

    }
    public TaskEntity(Long id, String name, String description, Date lastUpdated, String priority, String state, Long userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lastUpdated = lastUpdated;
        this.priority = priority;
        this.state = state;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }




}

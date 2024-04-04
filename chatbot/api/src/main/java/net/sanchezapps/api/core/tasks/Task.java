package net.sanchezapps.api.core.tasks;


import java.util.Date;

public class Task {
    private Long id;
    private String name;
    private String description;
    private Date lastUpdated;
    private TaskPriority priority;
    private TaskState state;

    public Task() {
    }

    public Task(Long id, String name, String description , Date lastUpdated, TaskPriority priority, TaskState state) {
        this.description = description;
        this.id = id;
        this.lastUpdated = lastUpdated;
        this.name = name;
        this.priority = priority;
        this.state = state;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Task{" +
                "description='" + description + '\'' +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", lastUpdated=" + lastUpdated +
                ", priority=" + priority +
                ", state=" + state +
                '}';
    }
}

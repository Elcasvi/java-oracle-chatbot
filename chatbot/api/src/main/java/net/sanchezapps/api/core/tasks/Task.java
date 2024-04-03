package net.sanchezapps.api.core.tasks;


public record Task(int id, String name, String description, TaskState state) {

}

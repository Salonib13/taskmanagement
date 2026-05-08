package com.example.taskmanagement.service;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public Task addTask(Task task) {
        return repo.save(task);
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public Task updateTask(Long id, Task newTask) {
        Task task = repo.findById(id).orElse(null);
        if (task != null) {
            task.setTitle(newTask.getTitle());
            task.setDescription(newTask.getDescription());
            task.setCompleted(newTask.isCompleted());
            return repo.save(task);
        }
        return null;
    }
}
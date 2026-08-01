import Project from "./project.js";
import Todo from "./todo.js";
import ProjectManager from "./projectManager.js";

const STORAGE_KEY = "todoAppData";
export function saveProjects(projectManager) {
  try {
    const projectsData = projectManager.getProjects().map((project) => ({
      name: project.name,
      todos: project.getTodos().map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        dueDate: todo.dueDate,
        completed: todo.completed || false,
      })),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsData));
  } catch (error) {
    console.log("Error saving to localStorage:", error);
  }
}

// Load data from localStorage and recreate ProjectManager
export function loadProjects() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (!storageData) return null;

        const projectsData = JSON.parse(storedData);
        if (!Array.isArray(projectsData) || projectsData.length === 0) return null;

        const manager = new ProjectManager();

        projectsData.todos.forEach(todoData => {
            const todo = new Todo(
                todoData.title,
                todoData.description || "",
                todoData.priority || "Medium",
                todoData.dueDate || ""
            );
            // preserve original ID
            if (todoData.id) {
                todo.id = todoData.id;
            }
            // if a to do was completed
        });
    }
}

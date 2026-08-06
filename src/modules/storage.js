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

        if (!storedData) return null;

        const projectsData = JSON.parse(storedData);

        if (!Array.isArray(projectsData) || projectsData.length === 0) {
            return null;
        }

        const manager = new ProjectManager();

        projectsData.forEach((projectData) => {
            const project = new Project(projectData.name);

            projectData.todos.forEach((todoData) => {
                const todo = new Todo(
                    todoData.title,
                    todoData.description || "",
                    todoData.priority || "Medium",
                    todoData.dueDate || ""
                );

                todo.id = todoData.id;
                todo.completed = todoData.completed || false;

                project.addTodo(todo);
            });

            manager.addProject(project);
        });

        return manager;

    } catch (error) {
        console.log("Error loading from localStorage:", error);
        return null;
    }
}
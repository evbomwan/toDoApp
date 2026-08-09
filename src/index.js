import "./styles.css";
import Todo from "./modules/todo.js";
import Project from "./modules/project.js";
import ProjectManager from "./modules/projectManager.js";
import createLayout from "./modules/dom.js";
import { renderProjects, renderTodos } from "./modules/render.js";
import { saveProjects, loadProjects } from "./modules/storage.js";

createLayout();

let manager = loadProjects();

if (!manager) {
  manager = new ProjectManager();

  const defaultProject = new Project("Default");
  manager.addProject(defaultProject);
}
let currentProject = manager.getProjects()[0];

function persist() {
  saveProjects(manager);
}
function handleUpdateTodo() {
  persist();
}
// Separate function to handle todo deletion
function handleDeleteTodo(todoId) {
  currentProject.removeTodo(todoId);
  renderTodos(currentProject, handleDeleteTodo, handleUpdateTodo);
  persist();
}
// function for deleting project
function handleDeleteProject(projectName) {
  if (!confirm(`Delete project "${projectName}"?`)) return;

  const wasCurrent = currentProject && currentProject.name === projectName;
  manager.removeProject(projectName);

  if (manager.getProjects().length === 0) {
    const defaultProject = new Project("Default");
    manager.addProject(defaultProject);
    currentProject = defaultProject;
  } else if (wasCurrent) {
    currentProject = manager.getProjects()[0];
  }
  renderProjects(manager, selectProject, handleDeleteProject);
  updateTodos();
  persist();
}
// Function to update todos display
function updateTodos() {
  renderTodos(currentProject, handleDeleteTodo, handleUpdateTodo);
}

function selectProject(project) {
  currentProject = project;
  updateTodos();
}

// Add default todos only on the first run
if (manager.getProjects()[0].getTodos().length === 0) {
  manager
    .getProjects()[0]
    .addTodo(
      new Todo(
        "Finish Odin Project",
        "Complete the Todo List application",
        "High",
        "2026-08-05",
      ),
    );
  manager
    .getProjects()[0]
    .addTodo(new Todo("Gym", "Leg day", "Low", "2026-07-29"));
  manager
    .getProjects()[0]
    .addTodo(new Todo("JavaScript", "Study all of JS", "High", "2026-08-01"));
}

// Initial render with selectProject callback
renderProjects(manager, selectProject, handleDeleteProject);
updateTodos();
persist();

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".project-form");
const projectCancelBtn = document.querySelector(".cancel-project-btn");

addProjectBtn.addEventListener("click", () => {
  projectForm.style.display = "flex";
  projectForm.querySelector("input").focus();
});

projectCancelBtn.addEventListener("click", () => {
  projectForm.reset();
  projectForm.style.display = "none";
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(projectForm);
  const name = formData.get("projectName");

  if (!name || !name.trim()) return;
  const project = new Project(name.trim());
  manager.addProject(project);

  selectProject(project);
  renderProjects(manager, selectProject);
  persist();

  projectForm.reset();
  projectForm.style.display = "none";
});

const addTodoBtn = document.querySelector(".add-todo-btn");
const todoForm = document.querySelector(".todo-form");

addTodoBtn.addEventListener("click", () => {
  todoForm.style.display = "flex";
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(todoForm);

  const title = formData.get("title");
  const description = formData.get("description");
  const priority = formData.get("priority");
  const dueDate = formData.get("dueDate");

  if (!title || !title.trim()) {
    alert("Please enter a title");
    return;
  }

  const todo = new Todo(title, description, priority, dueDate);
  currentProject.addTodo(todo);
  updateTodos();
  persist();
  todoForm.reset();
  todoForm.style.display = "none";
});

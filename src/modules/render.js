// to render the project
export function renderProjects(projectManager, selectProject) {
  const projectList = document.querySelector(".project-list");

  projectList.innerHTML = "";
  projectManager.getProjects().forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.classList.add("project-btn");
    projectBtn.textContent = project.name;
    projectBtn.addEventListener("click", () => {
      if (selectProject && typeof selectProject === 'function') {
        selectProject(project);
      }
    });
    projectList.append(projectBtn);
  });
}

// to render the the to do in a project
export function renderTodos(project, onDeleteTodo) {
  const todoList = document.querySelector(".todo-list");

  todoList.innerHTML = "";
  
  // Check if project has todos
  const todos = project.getTodos();
  if (!todos || todos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No todos in this project. Add one!";
    emptyMessage.classList.add("empty-message");
    todoList.append(emptyMessage);
    return;
  }
  
  todos.forEach((todo) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const title = document.createElement("h3");
    title.textContent = todo.title || "Untitled";

    const description = document.createElement("p");
    description.textContent = todo.description || "No description";
    description.classList.add("todo-description");

    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate || "No due date";
    dueDate.classList.add("todo-date");

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority || "Medium"}`;
    priority.classList.add("priority", todo.priority?.toLowerCase() || "medium");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = todo.id;
    deleteBtn.addEventListener("click", () => {
      if (onDeleteTodo && typeof onDeleteTodo === 'function') {
        onDeleteTodo(todo.id);
      }
    });
    
    card.append(title, description, dueDate, priority, deleteBtn);
    todoList.append(card);
  });
}
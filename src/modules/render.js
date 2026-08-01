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

    // header
    const header = document.createElement("div");
    header.classList.add("todo-header");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("todo-checkbox");

    const title = document.createElement("h3");
    title.textContent = todo.title || "Untitled";
    title.classList.add("todo-title");

    const priority = document.createElement("span");
    priority.textContent = todo.priority || "Medium";
    priority.classList.add(
      "priority",
       todo.priority?.toLowerCase() || "medium");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = todo.id;
    deleteBtn.addEventListener("click", () => {
      if (onDeleteTodo && typeof onDeleteTodo === 'function') {
        onDeleteTodo(todo.id);
      }
    });
    header.append(
      checkbox,
      title,
      priority
    );

     const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate || "No due date"}`;
    dueDate.classList.add("todo-date");

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Details";
    detailsBtn.classList.add("details-btn");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    actions.append(
      detailsBtn,
      editBtn,
      deleteBtn
    );

    const details = document.createElement("div");
    details.classList.add("todo-details");
    details.hidden = true;
    detailsBtn.addEventListener("click", () => {
      details.hidden = !details.hidden;

      if (details.hidden) {
        detailsBtn.textContent = "Details";
      } else {
        detailsBtn.textContent = "Hide";
      }
    })

    const description = document.createElement("p");
    description.classList.add("todo-description");
    description.textContent = todo.description || "No description provided";
    
    details.append(description);
    card.append(header,
      dueDate,
    actions,
  details);
    todoList.append(card);
  });
}
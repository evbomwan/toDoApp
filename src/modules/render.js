// to render the project
export function renderProjects(projectManager, selectProject) {
  const projectList = document.querySelector(".project-list");

  projectList.innerHTML = "";
  projectManager.getProjects().forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.classList.add("project-btn");
    projectBtn.textContent = project.name;
    projectBtn.addEventListener("click", () => {
      selectProject(project);
    });
    projectList.append(projectBtn);
  });
}

// to render the the to do in a project
export function renderTodos(project) {
  const todoList = document.querySelector(".todo-list");

  todoList.innerHTML = "";
  project.getTodos().forEach((todo) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;
    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority}`;
    card.append(title, dueDate, priority);
    todoList.append(card);
  });
}

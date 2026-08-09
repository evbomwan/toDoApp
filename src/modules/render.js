import {format, parseISO, isValid} from "date-fns";
function formatDueDate(dateString){
  if (!dateString) return "No due date";
  const date = parseISO(dateString);
  if (!isValid(date)) return "No due date";
  return format(date, "MMM d, yyyy");
}
// to render the project
export function renderProjects(projectManager, selectProject, onDeleteProject) {
  const projectList = document.querySelector(".project-list");

  projectList.innerHTML = "";
  projectManager.getProjects().forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectBtn = document.createElement("button");
    projectBtn.classList.add("project-btn");
    projectBtn.textContent = project.name;
    projectBtn.addEventListener("click", () => {
      if (selectProject && typeof selectProject === "function") {
        selectProject(project);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (onDeleteProject && typeof onDeleteProject === "function") {
        onDeleteProject(project.name);
      }
    });

    projectItem.append(projectBtn, deleteBtn);
    projectList.append(projectItem);
  });
}
// to render the todo in a project
export function renderTodos(project, onDeleteTodo, onUpdateTodo) {
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
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      if (todo.completed) {
        title.classList.add("completed");
      } else {
        title.classList.remove("completed");
      }
      if (typeof onUpdateTodo === "function") {
        onUpdateTodo();
      }
    });

    const title = document.createElement("h3");
    title.textContent = todo.title || "Untitled";
    title.classList.add("todo-title");

    if (todo.completed) {
      title.classList.add("completed");
    }

    const priority = document.createElement("span");
    priority.textContent = todo.priority || "Medium";
    priority.classList.add(
      "priority",
      todo.priority?.toLowerCase() || "medium",
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = todo.id;
    deleteBtn.addEventListener("click", () => {
      if (onDeleteTodo && typeof onDeleteTodo === "function") {
        onDeleteTodo(todo.id);
      }
    });
    header.append(checkbox, title, priority);

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${formatDueDate(todo.dueDate)}`;
    dueDate.classList.add("todo-date");

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Details";
    detailsBtn.classList.add("details-btn");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    actions.append(detailsBtn, editBtn, deleteBtn);

    const details = document.createElement("div");
    details.classList.add("todo-details");
    details.hidden = true;
    detailsBtn.addEventListener("click", () => {
      details.hidden = !details.hidden;

      if (details.hidden) {
        detailsBtn.textContent = "Details";
        exitEditMode();
      } else {
        detailsBtn.textContent = "Hide";
      }
    });

    const description = document.createElement("p");
    description.classList.add("todo-description");
    description.textContent = todo.description || "No description provided";
    // editable title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = todo.title;
    titleInput.classList.add("title-input");
    titleInput.hidden = true;

    const prioritySelect = document.createElement("select");
    prioritySelect.classList.add("priority-select");
    prioritySelect.hidden = true;

    ["High", "Medium", "Low"].forEach((level) => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level;

      if (level === todo.priority) {
        option.selected = true;
      }

      prioritySelect.append(option);
    });
    // editable due date
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.value = todo.dueDate;
    dueDateInput.classList.add("due-date-input");
    dueDateInput.hidden = true;

    const descriptionInput = document.createElement("textarea");
    descriptionInput.value = todo.description || "";
    descriptionInput.classList.add("description-input");
    descriptionInput.hidden = true;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("save-btn");
    saveBtn.hidden = true;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.hidden = true;

    function enterEditMode() {
      details.hidden = false;
      detailsBtn.textContent = "Hide";

      titleInput.hidden = false;

      description.hidden = true;
      descriptionInput.hidden = false;

      prioritySelect.hidden = false;

      dueDateInput.hidden = false;

      saveBtn.hidden = false;
      cancelBtn.hidden = false;

      editBtn.hidden = true;
    }

    function exitEditMode() {
      description.hidden = false;
      descriptionInput.hidden = true;

      titleInput.hidden = true;
      prioritySelect.hidden = true;
      dueDateInput.hidden = true;

      saveBtn.hidden = true;
      cancelBtn.hidden = true;

      editBtn.hidden = false;
    }

    details.append(
      titleInput,
      description,
      descriptionInput,
      prioritySelect,
      dueDateInput,
      saveBtn,
      cancelBtn,
    );

    card.append(header, dueDate, actions, details);
    editBtn.addEventListener("click", enterEditMode);
    titleInput.value = todo.title || "";
    descriptionInput.value = todo.description || "";
    prioritySelect.value = todo.priority || "Medium";
    dueDateInput.value = todo.dueDate || "";
    exitEditMode();

    saveBtn.addEventListener("click", () => {
      todo.editTodo({
        title: titleInput.value,
        description: descriptionInput.value,
        priority: prioritySelect.value,
        dueDate: dueDateInput.value,
      });

      title.textContent = todo.title;
      description.textContent = todo.description || "No description provided";
      priority.textContent = todo.priority;

      dueDate.textContent = `Due: ${formatDueDate(todo.dueDate)}`;
      exitEditMode();
      if (typeof onUpdateTodo === "function") {
        onUpdateTodo();
      }
    });
    todoList.append(card);
  });
}
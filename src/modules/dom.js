export default function createLayout() {
  const app = document.getElementById("app");

  const sideBar = document.createElement("aside");
  sideBar.classList.add("sidebar");

  const sideBarTitle = document.createElement("h2");
  sideBarTitle.textContent = "Projects";

  const projectList = document.createElement("div");
  projectList.classList.add("project-list");

  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = "+ New Project";
  addProjectBtn.classList.add("add-project-btn");

  sideBar.append(sideBarTitle, projectList, addProjectBtn);

  const content = document.createElement("main");
  content.classList.add("content");

  const contentTitle = document.createElement("h2");
  contentTitle.textContent = "Todos";

  const todoList = document.createElement("div");
  todoList.classList.add("todo-list");

  const addTodoBtn = document.createElement("button");
  addTodoBtn.textContent = "+ New Todo";
  addTodoBtn.classList.add("add-todo-btn");
// the form for adding a new to do
  const todoForm = document.createElement("form");
  todoForm.classList.add("todo-form");
  todoForm.style.display = "none";

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Title";
  titleInput.name = "title";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.placeholder = "Description";
  descriptionInput.name = "description";

  const priorityInput = document.createElement("select");
  priorityInput.name = "priority";
  ["High", "Medium", "Low"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    priorityInput.append(option);
  });

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.name = "dueDate";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Todo";
  submitBtn.classList.add("add-todo-btn");
  todoForm.append(
    titleInput,
    descriptionInput,
    priorityInput,
    dueDateInput,
    submitBtn,
  );

  content.append(contentTitle, todoList, addTodoBtn, todoForm);

  app.append(sideBar, content);
}

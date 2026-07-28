class Todo {
  constructor(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = false;
    this.id = crypto.randomUUID();
  }
  toggleComplete() {
    this.completed = !this.completed;
  }
  changePriority(priority) {
    this.priority = priority;
  }
  editTodo(updates) {
    if ("title" in updates) {
      this.title = updates.title;
    }
    if ("description" in updates) {
      this.description = updates.description;
    }

    if ("priority" in updates) {
      this.priority = updates.priority;
    }

    if ("dueDate" in updates) {
      this.dueDate = updates.dueDate;
    }
  }
}

export default Todo;

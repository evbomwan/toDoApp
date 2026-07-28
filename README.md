# Todo List Project Roadmap

This README serves as my implementation plan for The Odin Project's Todo List project. The goal is to build the application in small, logical steps while keeping the code modular and maintainable.

---

# Project Requirements

## Todo Objects
Each todo should be created dynamically using a **class**, **constructor**, or **factory function**.

Each todo must contain at least:

- Title
- Description
- Due Date
- Priority

Optional properties:

- Notes
- Checklist
- Completed status
- Unique ID

---

## Projects

The application should support multiple projects.

Requirements:

- A **Default** project should exist when the application first loads.
- Users should be able to create new projects.
- Users should be able to assign todos to any project.

---

## Application Logic

The application logic must be completely separated from the DOM.

Examples of application logic:

- Creating a todo
- Deleting a todo
- Editing a todo
- Marking a todo as complete
- Creating projects
- Deleting projects

None of these should directly manipulate HTML.

---

## User Interface

The UI should allow users to:

- View all projects
- Select a project
- View todos within the selected project
- Expand a todo to see its details
- Edit a todo
- Delete a todo
- Display priority visually (optional colors)

---

## Persistence

The application should save data using **localStorage**.

Requirements:

- Save projects whenever changes occur.
- Save todos whenever changes occur.
- Load saved data when the application starts.
- Prevent crashes if no saved data exists.

---

## External Library

Install and use **date-fns** for formatting and manipulating dates.

---

# Development Plan

---

## Phase 1 — Project Setup

- Initialize project
- Configure Webpack
- Configure GitHub repository
- Install dependencies
- Create project structure

Suggested structure:

```
src/
│
├── index.js
├── Todo.js
├── Project.js
├── ProjectManager.js
├── storage.js
├── dom.js
├── style.css
└── images/
```

---

## Phase 2 — Data Models

### Todo Class

Create a Todo class with properties such as:

- title
- description
- dueDate
- priority
- completed
- notes
- checklist
- id

---

### Project Class

Create a Project class.

Properties:

- name
- todos

Methods may include:

- addTodo()
- removeTodo()
- getTodo()

---

### Project Manager

Create a ProjectManager class.

Responsibilities:

- Store all projects
- Create projects
- Delete projects
- Find projects
- Return current project

---

## Phase 3 — Application Logic

Implement methods for:

### Todos

- Create todo
- Edit todo
- Delete todo
- Mark complete
- Change priority

### Projects

- Create project
- Delete project
- Select project

---

## Phase 4 — Testing Logic

Before creating any UI:

- Create projects
- Add todos
- Delete todos
- Edit todos

Verify everything works using the browser console.

---

## Phase 5 — Build the User Interface

Create the layout.

Possible layout:

```
-------------------------------------
| Projects |      Todos             |
|----------|------------------------|
| Default  | Laundry                |
| Work     | Grocery Shopping       |
| School   | Assignment             |
|          |                        |
-------------------------------------
```

Implement:

- Sidebar
- Project list
- Todo list
- Forms
- Buttons

---

## Phase 6 — Rendering

Display:

- Projects
- Todos
- Due dates
- Priority
- Completed status

Refresh the UI whenever data changes.

---

## Phase 7 — Todo Details

Allow users to:

- Expand todo
- View description
- View notes
- View checklist
- Edit details

---

## Phase 8 — Local Storage

Create storage module.

Implement:

### Save

Save entire ProjectManager to localStorage whenever:

- Todo added
- Todo deleted
- Todo edited
- Project added
- Project deleted

### Load

When application starts:

- Check if saved data exists
- If yes, load it
- If no, create Default project

---

## Phase 9 — Rebuild Objects

Remember:

JSON cannot store methods.

After loading from localStorage:

- Recreate Project instances
- Recreate Todo instances

instead of using plain objects.

---

## Phase 10 — UI Improvements

Optional improvements:

- Different priority colors
- Due today indicator
- Overdue indicator
- Animations
- Responsive design
- Dark mode
- Icons

---

# Suggested Build Order

1. Project setup
2. Todo class
3. Project class
4. ProjectManager
5. Test logic in console
6. Build UI layout
7. Display projects
8. Display todos
9. Add todo form
10. Add project form
11. Delete todos
12. Edit todos
13. Expand todo details
14. Install date-fns
15. Implement localStorage
16. Improve styling
17. Final testing
18. Deploy to GitHub Pages

---

# Goal

Build a modular Todo List application where:

- Logic is independent of the DOM.
- Data is organized using classes/modules.
- Projects contain multiple todos.
- Data persists with localStorage.
- The interface is clean, responsive, and easy to use.
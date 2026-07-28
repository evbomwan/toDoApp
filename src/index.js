import "./styles.css";
import Todo from "./modules/todo.js";
import Project from "./modules/project.js";
import ProjectManager from "./modules/projectManager.js";



const manager = new ProjectManager();
const defaultProject = new Project("Defualt");

manager.addProject(defaultProject);

defaultProject.addTodo(
    new Todo(
        "Finish Odin Project",
        "Complete the Todo List application",
        "high",
        "2026-08-05"
    )
);
defaultProject.addTodo(
    new Todo(
        "Gym",
        "Leg day",
        "Low",
        "2026-07-29"
    )
);
defaultProject.addTodo(
    new Todo(
        "JavaScript",
        "Study all of JS",
        "High",
        "2026-08-01"
    )
)
console.log(manager.getProjects());

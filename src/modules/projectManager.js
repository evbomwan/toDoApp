export default class ProjectManager {
    constructor() {
        this.projects = [];
    }
    addProject(project) {
        this.projects.push(project);
    }
    removeProject(name) {
        this.projects = this.projects.filter(project => project.name !== name);
    }
    getProject(name) {
        return this.projects.find(project.name) === name;
    }
    getProjects() {
        return this.projects;
    }
}
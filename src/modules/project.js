class Project {
    constructor(name, todos){
        this.name = name;
        this.todos = [];
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }
    getTodos() {
        return this.todos;
    }
};
export default Project;

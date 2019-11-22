const TodoModel = require('../models/todo.model');

class TodoRepository {

    constructor(datasource) {
        this.datasource = datasource;
    }

    async getAllTodos() {
        return (await this.datasource.getAllTodos()).map(todo => new TodoModel(todo.id, todo.name, todo.isCompleated));
    }

    async addTodo(todo) {
        let primitiveTodo = {
            name: todo.name,
            isCompleated: todo.isCompleated
        }

        return await this.datasource.addTodo(primitiveTodo);
    }

    async removeTodo(id) {
        return await this.datasource.removeTodo(id);
    }
}

module.exports = TodoRepository;
const TodoModel = require('../models/todo.model');

class TodoController {
    constructor(repository) {
        this.repository = repository;
    }

    getAllTodos = async (req, res) => {
        let todos = (await this.repository.getAllTodos()).map(todo => { return { 'id': todo.id, 'name': todo.name, 'is_compleated': todo.isCompleated }; });
        return res.send(todos);
    };

    createTodo = async (req, res) => {
        let newTodo = new TodoModel(-1, req.body.name, false);

        await this.repository.addTodo(newTodo);

        return res.send({ status: 'ok' });
    };

    removeTodo = async (req, res) => {
        console.log(req.params);
        
        await this.repository.removeTodo(req.params.id);

        return res.send({ status: 'ok' });
    };
}

module.exports = TodoController;
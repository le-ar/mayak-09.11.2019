const express = require('express');
const router = express.Router();

module.exports.init = async function () {
    const TodoSqliteDataSource = require('../datasources/todo.sqlite.datasource');
    const TodoRepository = require('../repositories/todo.repository');
    const TodoController = require("../controllers/todo.controller");

    let todoSqliteDataSource = await new TodoSqliteDataSource();
    let todoRepository = new TodoRepository(todoSqliteDataSource);
    let todoController = new TodoController(todoRepository);

    router.route('/')
        .get(todoController.getAllTodos)
        .post(todoController.createTodo);

    router.route('/delete/:id')
        .post(todoController.removeTodo);

    return router;
}
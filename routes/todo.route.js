const express = require('express');
const router = express.Router();
const controller = require("../controllers/todo.controller");

global.TODOS = [];

router.route('/')
.get(controller.getAllTodos)
.post(controller.createTodo);

router.route('/delete/:id')
.post(controller.removeTodo);

module.exports = router;
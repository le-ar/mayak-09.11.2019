global.TODOS = [];

module.exports.getAllTodos = async (req, res) => {
    return res.send(TODOS);
};

module.exports.createTodo = async (req, res) => {
    TODOS.push({ name: req.body.name, done: false });
    return res.send({ status: 'ok' });
};

module.exports.removeTodo = async (req, res) => {
    TODOS.splice(req.id, 1);
    return res.send({ status: 'ok' });
};
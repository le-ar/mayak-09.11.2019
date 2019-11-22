const sqlite = require('./sqlite.async');

class TodoSqliteDataSource {

    constructor() {
        this.db = sqlite.db;

        return this.init();
    }

    async init() {
        await sqlite.open('./db/todo.db');

        await sqlite.run('CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, is_compleated INT DEFAULT 0);');

        return this;
    }

    async getAllTodos() {
        return (await sqlite.all('SELECT id, name, is_compleated FROM todo'))
            .map(row => { return { 'id': row.id, 'name': row.name, 'isCompleated': row.is_compleated }; });
    }

    async addTodo(todo) {
        console.log(todo);
        
        return await sqlite.run(`INSERT INTO todo(name, is_compleated) VALUES(?, ?)`, [todo.name, todo.isCompleated]);
    }

    async removeTodo(id) {
        return await sqlite.run(`DELETE FROM todo WHERE id=?`, id);
    }
}

module.exports = TodoSqliteDataSource;
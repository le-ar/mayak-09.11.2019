const express = require('express');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const todoRouter = require('./routes/todo.route');

app.use(todoRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;

    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;

const express = require('express');
const createError = require('http-errors');
const todoRouter = require('./routes/todo.route');

const app = express();

todoRouter.init().then(router => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(router);

    app.use((req, res, next) => {
        next(createError(404));
    });

    app.use(function (err, req, res, next) {
        res.locals.message = err.message;

        res.status(err.status || 500);
        res.send(err);
    });
});

module.exports = app;

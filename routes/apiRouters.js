const {Router} = require('express');

const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const signInRouter = require('./signInRouter');
const errorPageRouter = require('./errorPageRouter');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/signIn', signInRouter);
routes.use('/errorPage', errorPageRouter);
routes.use((req, res) => {

    res.render('notFound');
});

module.exports = routes;
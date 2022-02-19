const {Router} = require('express');
let users = require('../db/users');

const loginRouter = Router();

loginRouter.get('/', (req, res) => {

    res.render('login');
});

loginRouter.post('/', (req, res) => {

    const {body} = req;
    const newUser = users.find(user => user.email === body.email);

    if (newUser) {
        error = 'THIS EMAIL HAS USED, TRY WITH ANOTHER EMAIL';
        res.redirect('/errorPage');
        return;
    }

    users.push({...body, id: users.length + 1});
    res.redirect('/users');
});

module.exports = loginRouter;


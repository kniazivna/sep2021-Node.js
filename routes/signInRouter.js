const {Router} = require('express');
let users = require('../db/users');

const signInRouter = Router();

signInRouter.get('/', (req, res) => {

    res.render('signIn');
});

signInRouter.post('/', (req, res) => {

    const {body} = req;
    const signInUser = users.find(user => user.email === body.email && user.password === body.password);

    if (!signInUser) {
        error = 'CHECK YOUR EMAIL AND PASSWORD OR TRY TO LOGIN';
        res.redirect('/errorPage');
        return
    }

    res.redirect(`/users/${signInUser.id}`);
});

module.exports = signInRouter;
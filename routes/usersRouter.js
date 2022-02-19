const {Router} = require('express');
let users = require('../db/users');

const usersRouter = Router();

usersRouter.get('/', (req, res) => {

    const {query} = req;

    if (query) {
        let filteredUsers = [...users];

        if (query.age) {
            filteredUsers = filteredUsers.filter(user => user.age === query.age);
        }

        if (query.city) {
            filteredUsers = filteredUsers.filter(user => user.city === query.city);
        }

        res.render('users', {users: filteredUsers});
        return;
    }

    res.render('users', {users});
});

usersRouter.get('/:id', (req, res) => {

    const {params} = req;
    const userWithId = users.find(user => user.id === +params.id);

    if (!userWithId) {
        error = `USER WHITH THIS ID: ${params.id} WAS NOT FOUND`;
        res.redirect('/errorPage');
        return;
    }

    res.render('userById', {userWithId});
});

module.exports = usersRouter;
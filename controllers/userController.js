const users = require('../db/users');

class UserController {

    renderUsers(req, res) {

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

    }

    getUserById(req, res) {
        const {id} = req.params;
        const userWithId = users.find(user => user.id === Number(id));

        if (!userWithId) {
            error = `USER WHITH THIS ID: ${id} WAS NOT FOUND`;
            res.redirect('/errorPage');
            return;
        }

        res.render('userById', {userWithId});
    }

}

module.exports = new UserController();
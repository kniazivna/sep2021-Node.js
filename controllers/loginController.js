const users = require('../db/users');

class LoginController {

    renderLogin(req, res) {
        res.render('login');
    }

    createLogination (req, res) {
        res.redirect('/users');
    }
}

module.exports = new LoginController();
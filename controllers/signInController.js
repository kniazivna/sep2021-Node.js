const users = require('../db/users');

class SignInController{

    renderSignIn(req, res){
        res.render('signIn');
    }

    signIn(req, res){
        const {body} = req;
        const signInUser = users.find(user => user.email === body.email && user.password === body.password);

        res.redirect(`/users/${signInUser.id}`);
    }

}
module.exports = new SignInController();
const users = require('../db/users');

class SignInController{

    renderSignIn(req, res){
        res.render('signIn');
    }

    signIn(req, res){
        const {body} = req;
        const signInUser = users.find(user => user.email === body.email && user.password === body.password);

        if (!signInUser) {
            error = 'CHECK YOUR EMAIL AND PASSWORD OR TRY TO LOGIN';
            res.redirect('/errorPage');
            return
        }

        res.redirect(`/users/${signInUser.id}`);
    }

}
module.exports = new SignInController();
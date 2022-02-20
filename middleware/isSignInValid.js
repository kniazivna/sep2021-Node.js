const users = require('../db/users');

function isSignInValid(req, res, next) {

    try{

        const {body} = req;
        const signInUser = users.find(user => user.email === body.email && user.password === body.password);

        if (!signInUser) {
            error = 'CHECK YOUR EMAIL AND PASSWORD OR TRY TO LOGIN';
            res.redirect('/errorPage');
            return
        }

        next();

    } catch (err){

        console.log(err.message);
        res.status(400).send(err.message);

    }
}

module.exports = isSignInValid;
const users = require('../db/users');

function isUserValid(req, res, next) {
    try {
        const {body} = req;

        const newUser = users.find(user => user.email === body.email);

        if (newUser) {
            error = 'THIS EMAIL HAS USED, TRY WITH ANOTHER EMAIL';
            res.redirect('/errorPage');
            return;
        }

        users.push({...body, id: users.length + 1});

        next();

    } catch (err) {

        console.log(err);
        res.status(400).send(err);

    }
}

module.exports = isUserValid;




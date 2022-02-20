function isLoginCorrect(req, res, next) {
    try {
        const {body} = req;
        for (let key in body) {
            if (!body[key]) {
                error = "CHECK IF ALL KEYS ARE FULFILED";
                res.redirect('errorPage');
                return
            }
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = isLoginCorrect;
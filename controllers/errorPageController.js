class ErrorPageController{

    renderErrorPage(req, res) {
        res.render('errorPage', {error});
    }
}

module.exports = new ErrorPageController();
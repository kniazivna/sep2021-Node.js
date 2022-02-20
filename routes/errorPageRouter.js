const {Router} = require('express');

const errorPageController = require('../controllers/errorPageController');

const errorPageRouter = Router();

errorPageRouter.get('/', errorPageController.renderErrorPage);

module.exports = errorPageRouter;
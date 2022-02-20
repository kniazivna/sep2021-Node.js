const {Router} = require('express');

const loginController = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);

loginRouter.post('/', loginController.createLogination);

module.exports = loginRouter;


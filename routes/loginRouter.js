const {Router} = require('express');

const loginController = require('../controllers/loginController');
const loginMiddleware = require('../middleware/isUserValid');
const loginCorrectMiddleware = require('../middleware/isLoginCorrect');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);

loginRouter.post('/', loginCorrectMiddleware, loginMiddleware, loginController.createLogination);

module.exports = loginRouter;


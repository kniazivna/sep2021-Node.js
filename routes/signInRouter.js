const {Router} = require('express');

const signInController = require('../controllers/signInController');
const signInMiddleware = require('../middleware/isSignInValid');

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);

signInRouter.post('/', signInMiddleware, signInController.signIn);

module.exports = signInRouter;
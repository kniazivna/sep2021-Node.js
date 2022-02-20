const {Router} = require('express');

const signInController = require('../controllers/signInController');

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);

signInRouter.post('/', signInController.signIn);

module.exports = signInRouter;
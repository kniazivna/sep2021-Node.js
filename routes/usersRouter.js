const {Router} = require('express');

const userController = require('../controllers/userController');

const usersRouter = Router();

usersRouter.get('/', userController.renderUsers);

usersRouter.get('/:id', userController.getUserById);

module.exports = usersRouter;
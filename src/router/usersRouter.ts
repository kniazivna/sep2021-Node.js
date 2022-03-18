import { Router } from 'express';

import { usersController } from '../controller/usersController';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:email', usersController.getUserByEmail);
router.get('/:id', usersController.getUserById);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export const usersRouter = router;

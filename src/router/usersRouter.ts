import { Router } from 'express';

import { usersController } from '../controller/usersController';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:email', usersController.getUserByEmail);

export const usersRouter = router;

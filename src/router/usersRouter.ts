import { Router } from 'express';

import { usersController } from '../controller';

const router = Router();

router.get('/', usersController.getUserPagination);
router.post('/', usersController.createUser);
router.get('/:email', usersController.getUserByEmail);

export const usersRouter = router;

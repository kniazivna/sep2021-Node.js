import { Router } from 'express';
import { usersController } from '../controller/usersController';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

export const usersRouter = router;

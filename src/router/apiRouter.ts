import { Router } from 'express';
import { usersRouter } from './usersRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export const apiRouter = router;

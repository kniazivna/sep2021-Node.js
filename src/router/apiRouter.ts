import { Router } from 'express';

import { usersRouter } from './usersRouter';
import { authRouter } from './authRouter';
import { postsRouter } from './postsRouter';
import { commentsRouter } from './commentsRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('posts', postsRouter);
router.use('comments', commentsRouter);

export const apiRouter = router;

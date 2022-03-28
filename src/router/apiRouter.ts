import { Router } from 'express';

import { usersRouter } from './usersRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.code || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;

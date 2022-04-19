import { Router } from 'express';

import { usersRouter } from './usersRouter';
import { authRouter } from './authRouter';
import { studentsRouter } from './studentsRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/students', studentsRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;

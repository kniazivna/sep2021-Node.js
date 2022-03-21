import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authController.registration);// тут при реєстрації одразу відбувається login
router.post('/login', authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
// router.post('/refresh', authController.registration);

export const authRouter = router;

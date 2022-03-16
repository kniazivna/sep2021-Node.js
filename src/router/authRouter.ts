import { Router } from "express";

const router = Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.post('/refresh');

export const authRouter = router;
import { Router } from 'express';

import { commentsController } from '../controller/commentsController';

const router = Router();

router.post('/', commentsController.createComment);
router.get('/:userId', commentsController.getCommentById);
router.post('/action', commentsController.actionWithComment);

export const commentsRouter = router;

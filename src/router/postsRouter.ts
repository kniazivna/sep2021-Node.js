import { Router } from 'express';
import { postsController } from '../controller/postsController';

const router = Router();

router.post('/', postsController.createPost);
router.get('/:userId', postsController.getPostById);
router.put('/:postId', postsController.updatePost);

export const postsRouter = router;

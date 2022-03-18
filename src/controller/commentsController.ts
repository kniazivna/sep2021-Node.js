import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { Comment, IComment } from '../entity/comment';
import { commentsService } from '../services/commentsService';

class CommentController {
    public async createComment(req: Request, res: Response):
        Promise<Response<IComment>> {
        const newComment = await commentsService.createComment(req.body);
        return res.status(201).json(newComment);
    }

    public async getCommentById(req: Request, res: Response):
        Promise<Response<IComment | IComment[]>> {
        const { userId } = req.params;
        const comment = await commentsService.getCommentById(Number(userId));
        return res.json(comment);
    }

    public async actionWithComment(req: Request, res: Response):
        Promise<Response<IComment | undefined>> {
        const { action, commentId } = req.body;
        const queryRunner = getManager().getRepository(Comment);
        const comment = await commentsService.actionWithComment(action, commentId);

        if (!comment) {
            throw new Error('Check comment id');
        }

        if (action === 'like') {
            await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
        }

        return res.sendStatus(201);
    }
}

export const commentsController = new CommentController();

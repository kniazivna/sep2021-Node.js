import { IComment } from '../entity/comment';
import { commentRepository } from '../repositiries/comment/commentRepository';

class CommentService {
    public async createComment(comment: IComment): Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async getCommentById(userId: number): Promise<IComment[]> {
        return commentRepository.getCommentById(userId);
    }

    public async actionWithComment(action: string, id: number): Promise<IComment | undefined> {
        return commentRepository.actionWithComment(action, id);
    }
}

export const commentsService = new CommentService();

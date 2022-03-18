import { EntityRepository, getManager, Repository } from 'typeorm';

import { Comment, IComment } from '../../entity/comment';
import { ICommentRepository } from './commentRepository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async createComment(comment: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async getCommentById(userId: number): Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async actionWithComment(action: string, id: number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .getOne();
    }
}

export const commentRepository = new CommentRepository();

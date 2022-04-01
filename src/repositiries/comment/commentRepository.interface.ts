import { IComment } from '../../entity';

export interface ICommentRepository {
    createComment(comment: IComment): Promise<IComment>;
    getCommentById(userId: number): Promise<IComment[]>;
    actionWithComment(action: string, id: number): Promise<IComment | undefined>;
}

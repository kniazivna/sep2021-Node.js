import { Request, Response } from 'express';

import { IPost } from '../entity/post';
import { postService } from '../services/postService';

class PostsController {
    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const newPost = await postService.newPost(req.body);
        return res.json(newPost);
    }

    public async getPostById(req: Request, res: Response): Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const post = await postService.getPostById(Number(userId));
        return res.json(post);
    }

    public async updatePost(req: Request, res: Response): Promise<Response<IPost>> {
        const { postId } = req.params;
        const { title, text } = req.body;
        const updatedPost = await postService.updatePost(Number(postId), title, text);
        return res.json(updatedPost);
    }
}

export const postsController = new PostsController();

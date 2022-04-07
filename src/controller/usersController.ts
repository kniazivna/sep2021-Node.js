import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity';
import { usersService } from '../services';

class UsersController {
    public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await usersService.getUsers();
        return res.json(users);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const userByEmail = await usersService.getUserByEmail(email);
        return res.json(userByEmail);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await usersService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, perPage = 25, ...other } = req.query;

            const userPagination = await usersService.getUserPagination(other, +page, +perPage);

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();

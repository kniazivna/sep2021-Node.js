import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { usersService } from '../services/usersService';

class UsersController {
    public async getUsers(req:Request, res:Response): Promise<Response<IUser[]>> {
        const users = await usersService.getUsers();
        return res.json(users);
    }

    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await usersService.createUser(req.body);
        return res.json(createdUser);
    }
}

export const usersController = new UsersController();

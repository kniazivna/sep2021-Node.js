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

    public async getUserByEmail(req:Request, res:Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const userByEmail = await usersService.getUserByEmail(email);
        return res.json(userByEmail);
    }

    public async getUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const userById = await usersService.getUserById(Number(id));
        return res.json(userById);
    }

    public async updateUser(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const { password, email } = req.body;
        const updatedUser = await usersService.updatedUser(Number(id), email, password);
        return res.json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<void | object> {
        const { id } = req.params;
        const deletedUser = await usersService.deletedUser(Number(id));
        res.json(deletedUser);
    }
}

export const usersController = new UsersController();

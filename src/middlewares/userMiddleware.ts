import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositiries/user/userRepository';
import {IUser} from "../entity";
import {userSchema} from "../validator/userValidator";

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    public async userValidation(req: IRequestExtended, res: Response, next: NextFunction): Promise<IUser | undefined> {
        try{
            const { error } = userSchema.validate()
        } catch (e) {

        }
    }
}

export const userMiddleware = new UserMiddleware();

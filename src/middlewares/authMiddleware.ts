import { NextFunction, Response } from 'express';
import { tokenService, usersService } from '../services';
import { IRequestExtended } from '../interfaces';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res: Response, next: NextFunction) {
        try {
            const authToken = req.get('Authorization');

            if (!authToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(authToken);

            const userFromToken = await usersService.getUserByEmail(userEmail);

            req.user = userFromToken;

            if (!userFromToken) {
                throw new Error('Wrong token');
            }

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();

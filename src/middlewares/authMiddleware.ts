import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../services';

class AuthMiddleware {
    public async checkAccessToken(req:Request, res: Response, next: NextFunction) {
        const authToken = req.get('Authorization');

        if (!authToken) {
            throw new Error('No token');
        }

        const resp = tokenService.verifyToken(authToken);

        console.log(resp);

        next();
    }
}

export const authMiddleware = new AuthMiddleware();

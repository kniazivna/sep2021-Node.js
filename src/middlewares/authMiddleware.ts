import { NextFunction, Response } from 'express';
import { tokenService, usersService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositiries/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

             if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }

            const userFromToken = await usersService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Error('No token');
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                throw new Error('Wrong Token');
            }

            const userFromToken = await usersService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();

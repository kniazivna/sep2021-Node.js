import { NextFunction, Response } from 'express';

import { tokenService, usersService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositiries/token/tokenRepository';
import { constants } from '../constants';
import { ErrorHandler } from '../error/ErrorHandler';
import { authValidator } from '../validators';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler('No token', 400));
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            /* const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            } */

            const userFromToken = await usersService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 400));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);

            if (!refreshToken) {
                next(new ErrorHandler('No token', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            const userFromToken = await usersService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    // VALIDATORS

    public registration(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = authValidator.registration.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = authValidator.login.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();

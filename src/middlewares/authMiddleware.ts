import { NextFunction, Response } from 'express';

import { tokenService, usersService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositiries/token/tokenRepository';
import { constants } from '../constants';
import { ErrorHandler } from '../error/ErrorHandler';
import { authValidator } from '../validators';
import { actionTokenRepository } from '../repositiries/actionToken/actionTokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
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

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);

            if (!refreshToken) {
                next(new ErrorHandler('No token', 400));
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

    public isRegistrationValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.registration.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;// value вже буде оброблене trim або ін.
            next();
        } catch (e) {
            next(e);
        }
    }

    public isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isEmailValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.email.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isPasswordValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.password.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(actionToken, 'action');

            const tokenFromDB = await actionTokenRepository.findByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const userFromToken = await usersService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    status: 401,
                    message: e.message,
                });
        }
    }
}

export const authMiddleware = new AuthMiddleware();

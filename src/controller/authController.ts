import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, usersService,
} from '../services';
import { ITokenData, IRequestExtended } from '../interfaces';
import { COOKIE, constants, EmailActionEnum } from '../constants';
import { IUser } from '../entity';
import { tokenRepository } from '../repositiries/token/tokenRepository';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res:Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, EmailActionEnum.ACCOUNT_BLOCKED);

            await usersService.compareUserPasswords(password, hashPassword);

            const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get(constants.AUTHORIZATION);

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();

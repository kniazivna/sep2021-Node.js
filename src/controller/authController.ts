import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, usersService,
} from '../services';
import { IRequestExtended, ITokenData } from '../interfaces';
import { constants, COOKIE, EmailActionEnum } from '../constants';
import { IUser } from '../entity';
import { tokenRepository } from '../repositiries/token/tokenRepository';
import { actionTokenRepository } from '../repositiries/actionToken/actionTokenRepository';
import { ActionTokenTypes } from '../enums/actionTokenTypes.enum';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        const { email, firstName } = req.body as IUser;

        await emailService.sendMail(email, EmailActionEnum.WELCOME, {
            userName: firstName,
        });

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res:Response): Promise<Response<string>> {
        const { id, email, firstName } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);
        await emailService.sendMail(email, EmailActionEnum.LOGOUT, {
            userName: firstName,
        });

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const {
                id, email, password: hashPassword, firstName,
            } = req.user as IUser;
            const { password } = req.body;

            await usersService.compareUserPasswords(password, hashPassword);

            await emailService.sendMail(email, EmailActionEnum.WRONG_PASSWORD, {
                userName: firstName,
            });

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

    async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService.generateActionToken({ userId: id, userEmail: email });

            await actionTokenRepository.createActionToken({ actionToken: token, type: ActionTokenTypes.forgotPassword, userId: id });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, {
                token,
                username: firstName,
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(constants.AUTHORIZATION);

            await usersService.updateUser(id, req.body);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();

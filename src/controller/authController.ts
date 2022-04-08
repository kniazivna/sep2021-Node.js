import { NextFunction, Request, Response } from 'express';

import { authService, emailService, s3Service, tokenService, usersService, } from '../services';
import { IRequestExtended } from '../interfaces';
import { constants, COOKIE, EmailActionEnum } from '../constants';
import { IUser } from '../entity';
import { tokenRepository } from '../repositiries/token/tokenRepository';
import { actionTokenRepository } from '../repositiries/actionToken/actionTokenRepository';
import { ActionTokenTypes } from '../enums/actionTokenTypes.enum';
import { UploadedFile } from 'express-fileupload';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        //тепер при реєстрації юзер не логіниться
        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDB = await usersService.getUserByEmail(email);

            if (userFromDB) {
                throw new Error(`User with email: ${email}  already exist`);
            }

            const createdUser = await usersService.createUser(req.body);

            //UPLOAD PHOTO
            //photos/users/userId/avatar258.jpg
            if (avatar) {
                let sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);

                console.log(sendData.Location);

                //UPDATE USER
            }


            const tokenData = await authService.registration(createdUser);
            // const { email, firstName } = req.body as IUser;
            //
            // await emailService.sendMail(email, EmailActionEnum.WELCOME, {
            //     userName: firstName,
            // });
            //
            // res.cookie(
            //     COOKIE.nameRefreshToken,
            //     tokenData.refreshToken,
            //     { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            // );

            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const {
            id,
            email,
            firstName
        } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);
        await emailService.sendMail(email, EmailActionEnum.LOGOUT, {
            userName: firstName,
        });

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id,
                email,
                password: hashPassword,
                firstName,
            } = req.user as IUser;
            const { password } = req.body;

            await usersService.compareUserPasswords(password, hashPassword);

            await emailService.sendMail(email, EmailActionEnum.WELCOME, {
                userName: firstName,
            });

            const {
                accessToken,
                refreshToken
            } = tokenService.generateTokenPair({
                userId: id,
                userEmail: email
            });

            await tokenRepository.createToken({
                accessToken,
                refreshToken,
                userId: id
            });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id,
                email
            } = req.user as IUser;
            const refreshTokenToDelete = req.get(constants.AUTHORIZATION);

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const {
                accessToken,
                refreshToken
            } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email
            });

            await tokenRepository.createToken({
                accessToken,
                refreshToken,
                userId: id
            });

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
            const {
                id,
                email,
                firstName
            } = req.user as IUser;

            const token = tokenService.generateActionToken({
                userId: id,
                userEmail: email
            });

            await actionTokenRepository.createActionToken({
                actionToken: token,
                type: ActionTokenTypes.forgotPassword,
                userId: id
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, {
                token,
                userName: firstName,
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

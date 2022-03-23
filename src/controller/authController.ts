import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { ITokenData, IRequestExtended } from '../interfaces';
import { COOKIE } from '../constants/cookie';
import { IUser } from '../entity';
import {tokenRepository} from "../repositiries/token/tokenRepository";

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

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res:Response) {
        try {
            const { id, email } = req.user as IUser;

            const tokenPair = tokenService.generateTokenPair({userId: id, userEmail: email });

            const {} = tokenPair;
            await tokenRepository.createToken({ refreshToken });

            res.json({
                ...tokenPair,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();

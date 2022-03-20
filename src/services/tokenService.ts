import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositiries/token/tokenRepository';
import { ITokenPair, IUserPayload } from '../interfaces/token.interface';

class TokenService {
    public async generateTokenPair(payload: IUserPayload):
        Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(userId);

        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        return tokenRepository.createToken({ refreshToken, userId });
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    verifyToken(authToken: string, tokenType: string = 'access'): string | JwtPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string);
    }
}

export const tokenService = new TokenService();

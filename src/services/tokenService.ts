import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositiries/token/tokenRepository';
import { ITokenPair, IUserPayload } from '../interfaces';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
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

    public async saveToken(userId: number, refreshToken: string, accessToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(userId);

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        return tokenRepository.createToken({
            accessToken,
            refreshToken,
            userId,
        });
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    verifyToken(authToken: string, tokenType: string = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }

    public generateActionToken(payload: IUserPayload): String {
        return jwt.sign(payload, config.SECRET_ACTION_KEY, { expiresIn: config.EXPIRES_IN_ACTION });
        // const accessToken = jwt.sign(payload, config.SECRET_ACTION_KEY as string, { expiresIn: config.EXPIRES_IN_ACCESS });
        // as String прописуємо,якщо в конфіг файлі не прописано значення за замовчуванням
    }
}

export const tokenService = new TokenService();

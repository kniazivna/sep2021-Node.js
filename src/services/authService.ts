import { usersService } from './usersService';
import { IUser } from '../entity';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(body: IUser): Promise<ITokenData> {
        const { email } = body;

        const userFromDB = await usersService.getUserByEmail(email);

        if (userFromDB) {
            throw new Error(`User with email: ${email}  already exist`);
        }

        const createdUser = await usersService.createUser(body);
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokensPair.refreshToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();

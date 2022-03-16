import { Request, Response } from 'express';
import { usersService } from './usersService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(req: Request, res: Response) {
        const { email } = req.body;

        const userFromDB = usersService.getUserByEmail(email);

        if (userFromDB) {
            throw new Error(`User with email: ${email}  already exist`);
        }

        const createdUser = usersService.createUser(req.body);
    }

    private async _getTokenData(userData: IUser) {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
    }
}

export const authService = new AuthService();

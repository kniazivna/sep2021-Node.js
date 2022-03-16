import bcrypt from 'bcrypt';

import { IUser } from '../entity/user';
import { userRepository } from '../repositiries/user/userRepository';

class UsersService {
    public async getUsers(): Promise<IUser[]> {
        const users = userRepository.getUsers();
        return users;
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        const createdUser = userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        const userByEmail = userRepository.getUserByEmail(email);
        return userByEmail;
        // можна коротше записати:
        // return userRepository.getUserByEmail(email);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const usersService = new UsersService();

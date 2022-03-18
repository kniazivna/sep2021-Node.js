import bcrypt from 'bcrypt';

import { IUser } from '../entity/user';
import { userRepository } from '../repositiries/user/userRepository';
import { config } from '../config/config';

class UsersService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async updatedUser(id: number, email: string, password: string): Promise<IUser | object> {
        return userRepository.updatedUser(id, email, password);
    }

    public async deletedUser(id: number): Promise<void | object> {
        return userRepository.deletedUser(id);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const usersService = new UsersService();

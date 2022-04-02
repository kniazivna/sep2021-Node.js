import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositiries/user/userRepository';
import { config } from '../config/config';

class UsersService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }

    public async updatePassword(id: number, Searchobj: Partial<IUser>): Promise<object | undefined> {
        if (Searchobj.password) {
            Searchobj.password = await this._hashPassword(Searchobj.password);
        }

        return userRepository.updateUser(id, Searchobj);
    }
}

export const usersService = new UsersService();

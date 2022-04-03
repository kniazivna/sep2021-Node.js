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

    public async updateUser(id: number, user: Partial<IUser>): Promise<object | undefined> {
if (user.password) {
    user.password = await this._hashPassword(user.password);
}

return userRepository.updateUser(id, user);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const usersService = new UsersService();

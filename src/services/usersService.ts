import { IUser } from '../entity/user';
import { userRepository } from '../repositiries/user/userRepository';

class UsersService {
    public async getUsers(): Promise<IUser[]> {
        const users = userRepository.getUsers();
        return users;
    }

    public async createUser(user:IUser): Promise<IUser> {
        const createdUser = userRepository.createUser(user);
        return createdUser;
    }
}

export const usersService = new UsersService();

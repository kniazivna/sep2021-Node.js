import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }
}

export const userRepository = new UserRepository();

import { EntityRepository, getManager, Repository } from 'typeorm';
import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .find({ relations: ['posts'] });
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getOne();
    }

    public async updatedUser(id: number, email: string, password: string): Promise<IUser | object> {
        return getManager().getRepository(User)
            .update({ id }, {
                email,
                password,
            });
    }

    public async deletedUser(id: number): Promise<void | object> {
        return getManager()
            .getRepository(User)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();

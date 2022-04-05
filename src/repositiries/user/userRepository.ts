import { EntityRepository, getManager, Repository } from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../../entity';
import { IUserRepository } from './userRepository.interface';

dayjs.extend(utc);

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
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

    public updateUser(id: number, user: Partial<IUser>): Promise<object> {
        return getManager().getRepository(User).update({ id }, user);
    }

    public getNewUsers() {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where( 'user.createdAt >= :date', {date: dayjs().utc().startOf('day').format()})
            .getMany()

    }
}

export const userRepository = new UserRepository();

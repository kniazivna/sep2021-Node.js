import { IUser } from '../../entity/user';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getUserById(id: number): Promise<IUser | undefined>;
    updatedUser(id: number, email: string, password: string): Promise<IUser | object>;
    deletedUser(id: number): Promise<void | object>;
}

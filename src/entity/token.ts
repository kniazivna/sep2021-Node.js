import {
    Column, Entity, OneToOne, JoinColumn,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IToken {
    refreshToken: string;
    userId: number;
}

@Entity('tokens', { database: 'okten' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user:User;
}

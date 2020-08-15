import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Permission} from './permission.entity';
import {User} from '../user/user.entity';

@Entity()
export class UserPermission  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.id, {
        eager: true,
        cascade: true,
    })
    user: User;

    @ManyToOne(type => Permission, permission => permission.id, {
        cascade: true,
        eager: true,
    })
    role: Permission;
}

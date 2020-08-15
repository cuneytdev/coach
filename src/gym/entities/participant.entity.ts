import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {User} from '../../user/user.entity';
import {Gym} from './gym.entity';

@Entity()
export class Participant  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.id, {
        cascade: true,
        eager: true,
    })
    user: User;

    @ManyToOne(type => Gym, gym => gym.id, {
        cascade: true,
        eager: true,
    })
    gym: Gym;
}

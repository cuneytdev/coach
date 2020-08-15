import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {User} from '../../user/user.entity';

@Entity()
export class Gym  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @Column({ length: 500 })
    name: string;

    @IsNotEmpty()
    @Column({ length: 500 })
    description: string;

    @ManyToOne(type => User, user => user.id, {
        cascade: true,
        eager: true,
    })
    owner: User;

    @IsNotEmpty()
    @Column({ length: 500 })
    address: string;
}

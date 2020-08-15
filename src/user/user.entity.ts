import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {IsNotEmpty} from 'class-validator';

@Entity()
export class User  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ length: 500 })
  name: string;

  @IsNotEmpty()
  @Column({ length: 500 })
  email: string;

  @IsNotEmpty()
  @Column({ length: 500 })
  password: string;
}

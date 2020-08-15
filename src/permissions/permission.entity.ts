import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  role: string;

  @Column({ length: 500 })
  description: string;
}

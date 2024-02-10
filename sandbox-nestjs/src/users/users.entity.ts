import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export type Role = 'user' | 'admin';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Jhon' })
  firstName: string;

  @Column({ default: 'Doe' })
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { haskPassword } from 'src/auth/consts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.UserRepository.findOneBy({ id });
  }

  async findOneByName(userName: string): Promise<User> {
    Logger.log(userName);
    const user: User = await this.UserRepository.findOneBy({
      userName: userName,
    });
    return user;
  }

  async create(user: User): Promise<User> {
    const hash = await haskPassword(user.password);

    delete user.password;

    const newUser = {
      ...user,
      password: hash,
    };

    return await this.UserRepository.save(newUser);
  }

  async update(id: number, User: User): Promise<User> {
    const UserToUpdate = await this.UserRepository.findOneBy({ id });

    if (!UserToUpdate) {
      throw new Error('User not found');
    }

    const hash = await haskPassword(User.password);

    return await this.UserRepository.save({
      ...User,
      password: hash,
    });
  }

  async remove(id: number): Promise<void> {
    await this.UserRepository.delete(id);
  }
}

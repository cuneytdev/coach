import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import * as bcrypt from 'bcryptjs';
import {Base} from '../model/base.dto';
import {UserPermission} from '../permissions/user-permissions.entity';
import {ErrorBase} from '../model/error-base.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async find(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await this.hashPassword(password);
    return await this.userRepository.save(user);
  }

  async update(userData: User): Promise<Base<User> | ErrorBase> {
    try {
      const result = new Base<UserPermission>();
      await this.userRepository.save(userData);
      result.result = await this.userRepository.findOne(userData.id);
      delete result.result.password;
      result.success = true;
      return result;
    } catch (e) {
      const err = new ErrorBase();
      err.success = false;
      err.error = e;
      return err;
    }
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(plain, saltRounds);
  }
}

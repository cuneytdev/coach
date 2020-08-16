import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import {Base} from '../model/base.dto';
import {UserPermission} from './user-permissions.entity';
import {ErrorBase} from '../model/error-base.dto';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Base<Permission[]> | ErrorBase> {
    try {
      const result = new Base<UserPermission>();
      result.result = await this.permRepository.find();
      result.success = true;
      return result;
    } catch (e) {
      const err = new ErrorBase();
      err.success = false;
      err.error = e;
      return err;
    }
  }

  async find(id: number): Promise<Permission> {
    return await this.permRepository.findOne(id);
  }

  async findByRole(perm: string): Promise<Permission> {
    return await this.permRepository.findOne({ where: { role: perm } });
  }

  async create(role: string, description: string): Promise<Permission> {
    const perm = new Permission();
    perm.role = role;
    perm.description = description;
    return await this.permRepository.save(perm);
  }
}

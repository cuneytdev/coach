import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import {Role} from './permission.enum';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return await this.permRepository.find();
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

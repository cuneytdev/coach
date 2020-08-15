import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {UserPermission} from './user-permissions.entity';

@Injectable()
export class UserPermissionService {
    constructor(
        @Inject('USER_PERMISSION_REPOSITORY')
        private readonly userPermRepository: Repository<UserPermission>,
    ) { }

    async findAll(): Promise<UserPermission[]> {
        return await this.userPermRepository.find();
    }

    async find(id: number): Promise<UserPermission> {
        return await this.userPermRepository.findOne(id);
    }

    async findUserRoleById(id: string): Promise<UserPermission> {
        return await this.userPermRepository.findOne({ where: { user: id } });
    }

    async findByRole(perm: string): Promise<UserPermission> {
        return await this.userPermRepository.findOne({ where: { perm } });
    }
    async findByUserId(userId: string): Promise<UserPermission> {
        return await this.userPermRepository.findOne({ where: { userId } });
    }

    async create(userId: string, role: string, roleName): Promise<UserPermission> {
        const userPerm = {
            user: {
                id: userId,
            },
            role: {
                id: role,
            },
        };
        return await this.userPermRepository.save(userPerm);
    }

    async updateUserPermission(userPermission: UserPermission) {
        await this.userPermRepository.save(userPermission);
        return await this.userPermRepository.findOne(userPermission.id);
    }
}

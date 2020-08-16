import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {UserPermission} from './user-permissions.entity';
import {Base} from '../model/base.dto';
import {ErrorBase} from '../model/error-base.dto';

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

    async findUserRoleById(id: string): Promise<Base<UserPermission> | ErrorBase> {
        try {
            const result = new Base<UserPermission>();
            result.result = await this.userPermRepository.findOne({ where: { user: id } });
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async findByRole(perm: string): Promise<UserPermission> {
        return await this.userPermRepository.findOne({ where: { perm } });
    }
    async findByUserId(userId: string): Promise<UserPermission> {
        return await this.userPermRepository.findOne({ where: { userId } });
    }

    async create(userId: string, role: string): Promise<UserPermission> {
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

    async updateUserPermission(userPermission: UserPermission): Promise<Base<UserPermission> | ErrorBase> {
        try {
            const result = new Base<UserPermission>();
            await this.userPermRepository.save(userPermission);
            result.result = await this.userPermRepository.findOne(userPermission.id);
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }
}

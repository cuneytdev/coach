import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {UserPermissionService} from '../user-permissions.service';
import {User} from '../../user/user.entity';
import {UserPermission} from '../user-permissions.entity';
import {matchRoles} from '../../shared/utils';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userPermissionService: UserPermissionService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        if (user) {
            const userPerm: UserPermission = await this.userPermissionService.findByUserId(user.id);
            return matchRoles(roles, userPerm.role.role);
        }
    }
}

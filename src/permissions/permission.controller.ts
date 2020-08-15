import {Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from './guards/roles.guard';
import {Roles} from './decorators/role.decorator';
import {Request} from 'express';
import {UserPermission} from './user-permissions.entity';
import {UserPermissionService} from './user-permissions.service';
import {PermissionService} from './permissions.service';

@Controller('permission')
export class PermissionController {
    constructor(private readonly userPermissionService: UserPermissionService, private readonly permissionService: PermissionService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('updateUserPermission')
    @Roles('user')
    async updateUserPermission(@Req() req: Request) {
        return this.userPermissionService.updateUserPermission(req.body as UserPermission);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('getUserPermission/:id')
    @Roles('user')
    async getUserPermission(@Param('id') id) {
        return this.userPermissionService.findUserRoleById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('list')
    @Roles('user')
    async getAllPermissions() {
        return this.permissionService.findAll();
    }
}

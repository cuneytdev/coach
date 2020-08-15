import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from '@nestjs/passport';
import {User} from './user.entity';
import {RolesGuard} from '../permissions/guards/roles.guard';
import {Roles} from '../permissions/decorators/role.decorator';
import {Request} from 'express';
import {UserPermission} from '../permissions/user-permissions.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('update')
    @Roles('user')
    async update(@Req() req: Request) {
        return this.userService.update(req.body as User);
    }
}

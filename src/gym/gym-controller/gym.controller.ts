import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {GymService} from './gym.service';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../../permissions/decorators/role.decorator';
import {Request} from 'express';
import {Gym} from '../entities/gym.entity';
import {RolesGuard} from '../../permissions/guards/roles.guard';

@Controller('gym')
export class GymController {
    constructor(private readonly gymService: GymService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('')
    @Roles('user')
    async getAllGyms() {
        return this.gymService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('create')
    @Roles('user')
    async createGym(@Req() req: Request) {
        return this.gymService.create(req.body as Gym);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('update')
    @Roles('user')
    async updateGym(@Req() req: Request) {
        return this.gymService.update(req.body as Gym);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('delete')
    @Roles('user')
    async deleteGym(@Req() req: Request) {
        return this.gymService.delete(req.body as Gym);
    }
}

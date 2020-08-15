import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {ParticipantService} from './participant.service';
import {RolesGuard} from '../../permissions/guards/roles.guard';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../../permissions/decorators/role.decorator';
import {Participant} from '../entities/participant.entity';
import {Request} from 'express';

@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('')
    @Roles('user')
    async getAllGyms() {
        return this.participantService.findAll();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('create')
    @Roles('user')
    async createGym(@Req() req: Request) {
        return this.participantService.create(req.body as unknown as Participant);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('update')
    @Roles('user')
    async updateGym(@Req() req: Request) {
        return this.participantService.update(req.body as Participant);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('delete')
    @Roles('user')
    async deleteGym(@Req() req: Request) {
        return this.participantService.delete(req.body as Participant);
    }
}

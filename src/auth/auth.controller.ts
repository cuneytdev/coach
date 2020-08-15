import {Controller, Post, UseGuards, Req, UseFilters, Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import {Roles} from '../permissions/decorators/role.decorator';
import {RolesGuard} from '../permissions/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local-sign-up'))
  @Post('sign-up')
  async signUp(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(AuthGuard('local-sign-in'))
  @Post('sign-in')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('whoami')
  @Roles('user')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}

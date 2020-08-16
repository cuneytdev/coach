import {Controller, Post, UseGuards, Req, Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import {Roles} from '../permissions/decorators/role.decorator';
import {RolesGuard} from '../permissions/guards/roles.guard';
import {ErrorBase} from '../model/error-base.dto';
import {Base} from '../model/base.dto';

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
  getProfile(@Req() req: Request): Base<User> | ErrorBase {
    try {
      const result = new Base<User>();
      result.result = req.user;
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

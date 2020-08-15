import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import {PermissionService} from '../permissions/permissions.service';
import {UserPermissionService} from '../permissions/user-permissions.service';
import {Role} from '../permissions/permission.enum';
import {Permission} from '../permissions/permission.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userPermissionService: UserPermissionService,
    private readonly permissionService: PermissionService,
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (! user) {
      throw new BadRequestException('auth/account-not-found');
    }
    const matches: boolean = await bcrypt.compare(password, user.password);
    if (! matches) {
      throw new BadRequestException('auth/wrong-password');
    }
    delete user.password;
    return user;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const existing = await this.userService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('auth/account-exists');
    }
    const user: User = await this.userService.create(name, email, password);
    const permission: Permission = await this.permissionService.findByRole(Role.USER);
    await this.userPermissionService.create(user.id, permission.id, permission.role);
    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = { name: user.name, email: user.email, sub: user.id };
    return {
      id: user.id,
      user: user.name,
      access_token: this.jwtService.sign(payload),
    };
  }

}

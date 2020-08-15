import { Connection } from 'typeorm';
import { Permission } from './permission.entity';
import {UserPermission} from './user-permissions.entity';
import {APP_GUARD} from '@nestjs/core';
import {RolesGuard} from './guards/roles.guard';

export const permissionProviders = [
  {
    provide: 'PERMISSION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Permission),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_PERMISSION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserPermission),
    inject: ['DATABASE_CONNECTION'],
  },
];

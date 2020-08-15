import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import {UserController} from './user.controller';
import {PermissionsModule} from '../permissions/permissions.module';

@Module({
  imports: [
    DatabaseModule,
    PermissionsModule,
  ],
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [UserService, ...userProviders],
  controllers: [UserController],

})
export class UserModule {}

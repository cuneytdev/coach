import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {PermissionsModule} from './permissions/permissions.module';
import {GymModule} from './gym/gym.module';

@Module({
  imports: [AuthModule, UserModule, PermissionsModule, GymModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

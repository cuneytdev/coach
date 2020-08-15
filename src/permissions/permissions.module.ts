import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {permissionProviders} from './permissions.providers';
import {PermissionService} from './permissions.service';
import {UserPermissionService} from './user-permissions.service';
import {PermissionController} from './permission.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        ...permissionProviders,
        PermissionService,
        UserPermissionService,
    ],
    exports: [PermissionService, UserPermissionService, ...permissionProviders],
    controllers: [
        PermissionController,
    ],
})
export class PermissionsModule {}

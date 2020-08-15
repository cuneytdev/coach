import {Module} from '@nestjs/common';
import {gymProviders} from './gym.providers';
import {DatabaseModule} from '../database/database.module';
import {GymController} from './gym-controller/gym.controller';
import {GymService} from './gym-controller/gym.service';
import {PermissionsModule} from '../permissions/permissions.module';
import {ParticipantController} from './gym-participant-controller/participant.controller';
import {ParticipantService} from './gym-participant-controller/participant.service';

@Module({
    imports: [DatabaseModule, PermissionsModule],
    providers: [
        GymService,
        ParticipantService,
        ...gymProviders],
    exports: [GymService, ParticipantService],
    controllers: [GymController, ParticipantController],

})
export class GymModule {}

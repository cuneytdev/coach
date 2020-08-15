import { Connection } from 'typeorm';
import {Gym} from './entities/gym.entity';
import {Participant} from './entities/participant.entity';

export const gymProviders = [
    {
        provide: 'GYM_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Gym),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PARTICIPANT_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Participant),
        inject: ['DATABASE_CONNECTION'],
    },
];

import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Participant} from '../entities/participant.entity';
import {Gym} from '../entities/gym.entity';
import {ErrorBase} from '../../model/error-base.dto';
import {Base} from '../../model/base.dto';

@Injectable()
export class ParticipantService {
    constructor(
        @Inject('PARTICIPANT_REPOSITORY')
        private readonly gymParticipantRepository: Repository<Participant>,
    ) { }

    async findAll(): Promise<Participant[]> {
        return await this.gymParticipantRepository.find();
    }

    async find(id: number): Promise<Participant> {
        return await this.gymParticipantRepository.findOne(id);
    }

    async findByOwner(ownerId: string): Promise<Participant> {
        return await this.gymParticipantRepository.findOne({ where: { owner: ownerId } });
    }

    async delete(participant: Participant): Promise<Participant> {
        return await this.gymParticipantRepository.remove(participant);
    }

    async create(gym: Participant): Promise<Base<Participant> | ErrorBase> {
        const user = await this.gymParticipantRepository.findOne({where: {user: gym.user}});
        if (!user) {
            const resp = await this.gymParticipantRepository.save(gym);
            const result = new Base<Participant>();
            result.success = true;
            result.result = resp;
            return result;
        } else {
            const err = new ErrorBase();
            err.success = true;
            err.resultInfo = 'Participant already exist';
            return err;
        }
    }

    async update(gymParticipantData: Participant) {
        await this.gymParticipantRepository.save(gymParticipantData);
        return await this.gymParticipantRepository.findOne(gymParticipantData.id);
    }
}

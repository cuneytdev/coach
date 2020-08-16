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

    async findAll(): Promise<Base<Participant[]> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymParticipantRepository.find();
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async find(id: number): Promise<Base<Participant> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymParticipantRepository.findOne(id);
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async findByOwner(ownerId: string): Promise<Base<Participant> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymParticipantRepository.findOne({ where: { owner: ownerId } });
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async delete(participant: Participant): Promise<Base<Participant> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymParticipantRepository.remove(participant);
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
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

    async update(gymParticipantData: Participant): Promise<Base<Participant> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            await this.gymParticipantRepository.save(gymParticipantData);
            result.result = await this.gymParticipantRepository.findOne(gymParticipantData.id);
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

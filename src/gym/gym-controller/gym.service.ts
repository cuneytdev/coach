import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Gym} from '../entities/gym.entity';
import {Base} from '../../model/base.dto';
import {ErrorBase} from '../../model/error-base.dto';

@Injectable()
export class GymService {
    constructor(
        @Inject('GYM_REPOSITORY')
        private readonly gymRepository: Repository<Gym>,
    ) { }

    async findAll(): Promise<Base<Gym[]> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymRepository.find();
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async delete(gym: Gym): Promise<Base<Gym> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymRepository.remove(gym);
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async find(id: number): Promise<Base<Gym> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymRepository.findOne(id);
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async findByOwner(ownerId: string): Promise<Base<Gym> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymRepository.findOne({ where: { owner: ownerId } });
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async create(gym: Gym): Promise<Base<Gym> | ErrorBase> {
        try {
            const result = new Base<Gym>();
            result.result = await this.gymRepository.save(gym);
            result.success = true;
            return result;
        } catch (e) {
            const err = new ErrorBase();
            err.success = false;
            err.error = e;
            return err;
        }
    }

    async update(gymData: Gym): Promise<Base<Gym> |ErrorBase> {
        try {
            const result = new Base<Gym>();
            await this.gymRepository.save(gymData);
            result.result = await this.gymRepository.findOne(gymData.id);
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

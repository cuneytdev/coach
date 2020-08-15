import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult, Repository} from 'typeorm';
import {Gym} from '../entities/gym.entity';

@Injectable()
export class GymService {
    constructor(
        @Inject('GYM_REPOSITORY')
        private readonly gymRepository: Repository<Gym>,
    ) { }

    async findAll(): Promise<Gym[]> {
        return await this.gymRepository.find();
    }

    async delete(gym: Gym): Promise<Gym> {
        return await this.gymRepository.remove(gym);
    }

    async find(id: number): Promise<Gym> {
        return await this.gymRepository.findOne(id);
    }

    async findByOwner(ownerId: string): Promise<Gym> {
        return await this.gymRepository.findOne({ where: { owner: ownerId } });
    }

    async create(gym: Gym): Promise<Gym> {
        return await this.gymRepository.save(gym);
    }

    async update(gymData: Gym) {
        await this.gymRepository.save(gymData);
        return await this.gymRepository.findOne(gymData.id);
    }
}

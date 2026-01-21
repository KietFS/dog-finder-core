import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { IDogRepository } from './interfaces/dog.interface';
import { DogQueryDto } from './dto/dog-query.dto';

@Injectable()
export class DogsRepository implements IDogRepository {
    constructor(
        @InjectRepository(Dog)
        private readonly dogRepository: Repository<Dog>,
    ) { }

    async findAll(filters: DogQueryDto, skip: number, take: number): Promise<[Dog[], number]> {
        const where: any = {};

        if (filters.breed_id) {
            where.breed_id = filters.breed_id;
        }

        if (filters.size) {
            where.size = filters.size;
        }

        if (filters.temperament) {
            where.temperament = ILike(`%${filters.temperament}%`);
        }

        // Handle age range filtering
        if (filters.min_age !== undefined && filters.max_age !== undefined) {
            where.age = Between(filters.min_age, filters.max_age);
        } else if (filters.min_age !== undefined) {
            where.age = MoreThanOrEqual(filters.min_age);
        } else if (filters.max_age !== undefined) {
            where.age = LessThanOrEqual(filters.max_age);
        }

        return this.dogRepository.findAndCount({
            where,
            relations: ['breed', 'image'],
            skip,
            take,
            order: { created_at: 'DESC' },
        });
    }

    async findById(id: number): Promise<Dog | null> {
        return this.dogRepository.findOne({
            where: { id },
            relations: ['breed', 'image'],
        });
    }
}

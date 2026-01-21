import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { IBreedRepository } from './interfaces/breed.interface';
import { BreedQueryDto } from './dto/breed-query.dto';

@Injectable()
export class BreedsRepository implements IBreedRepository {
    constructor(
        @InjectRepository(Breed)
        private readonly breedRepository: Repository<Breed>,
    ) { }

    async findAll(
        filters: BreedQueryDto,
        skip: number,
        take: number,
    ): Promise<[Breed[], number]> {
        const where: any = {};

        if (filters.name) {
            where.name = ILike(`%${filters.name}%`);
        }

        if (filters.breed_group) {
            where.breed_group = ILike(`%${filters.breed_group}%`);
        }

        if (filters.temperament) {
            where.temperament = ILike(`%${filters.temperament}%`);
        }

        if (filters.origin) {
            where.origin = ILike(`%${filters.origin}%`);
        }

        return this.breedRepository.findAndCount({
            where,
            skip,
            take,
            order: { name: 'ASC' },
        });
    }

    async findById(id: number): Promise<Breed | null> {
        return this.breedRepository.findOne({ where: { id } });
    }
}

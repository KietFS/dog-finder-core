import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DogsRepository } from './dogs.repository';
import { DogQueryDto } from './dto/dog-query.dto';
import { DogResponseDto } from './dto/dog-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { calculatePagination } from '../../common/utils/pagination.util';

@Injectable()
export class DogsService {
    constructor(
        private readonly dogsRepository: DogsRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async findAll(query: DogQueryDto): Promise<PaginationResponseDto<DogResponseDto>> {
        const { page = 1, limit = 10, ...filters } = query;
        const { skip, take } = calculatePagination(page, limit);

        const cacheKey = `dogs:${JSON.stringify(query)}`;
        const cached = await this.cacheManager.get<PaginationResponseDto<DogResponseDto>>(cacheKey);
        if (cached) {
            return cached;
        }

        const [dogs, total] = await this.dogsRepository.findAll(filters, skip, take);

        const response = new PaginationResponseDto(
            dogs.map((dog) => this.mapToResponseDto(dog)),
            total,
            page,
            limit,
        );

        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    async findOne(id: number): Promise<DogResponseDto> {
        const cacheKey = `dog:${id}`;
        const cached = await this.cacheManager.get<DogResponseDto>(cacheKey);
        if (cached) {
            return cached;
        }

        const dog = await this.dogsRepository.findById(id);

        if (!dog) {
            throw new NotFoundException(`Dog with ID ${id} not found`);
        }

        const response = this.mapToResponseDto(dog);
        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    private mapToResponseDto(dog: any): DogResponseDto {
        return {
            id: dog.id,
            name: dog.name,
            breed: {
                id: dog.breed.id,
                name: dog.breed.name,
                temperament: dog.breed.temperament,
            },
            image: dog.image
                ? {
                    id: dog.image.id,
                    url: dog.image.url,
                }
                : undefined,
            size: dog.size,
            age: dog.age,
            temperament: dog.temperament,
            created_at: dog.created_at,
            updated_at: dog.updated_at,
        };
    }
}

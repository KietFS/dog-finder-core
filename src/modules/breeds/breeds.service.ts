import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BreedsRepository } from './breeds.repository';
import { BreedQueryDto } from './dto/breed-query.dto';
import { BreedResponseDto } from './dto/breed-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { calculatePagination } from '../../common/utils/pagination.util';

@Injectable()
export class BreedsService {
    constructor(
        private readonly breedsRepository: BreedsRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async findAll(query: BreedQueryDto): Promise<PaginationResponseDto<BreedResponseDto>> {
        const { page = 1, limit = 10, ...filters } = query;
        const { skip, take } = calculatePagination(page, limit);

        // Create cache key based on query parameters
        const cacheKey = `breeds:${JSON.stringify(query)}`;

        // Try to get from cache
        const cached = await this.cacheManager.get<PaginationResponseDto<BreedResponseDto>>(cacheKey);
        if (cached) {
            return cached;
        }

        const [breeds, total] = await this.breedsRepository.findAll(filters, skip, take);

        const response = new PaginationResponseDto(
            breeds.map((breed) => this.mapToResponseDto(breed)),
            total,
            page,
            limit,
        );

        // Cache the result
        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    async findOne(id: number): Promise<BreedResponseDto> {
        const cacheKey = `breed:${id}`;

        // Try to get from cache
        const cached = await this.cacheManager.get<BreedResponseDto>(cacheKey);
        if (cached) {
            return cached;
        }

        const breed = await this.breedsRepository.findById(id);

        if (!breed) {
            throw new NotFoundException(`Breed with ID ${id} not found`);
        }

        const response = this.mapToResponseDto(breed);

        // Cache the result
        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    private mapToResponseDto(breed: any): BreedResponseDto {
        return {
            id: breed.id,
            name: breed.name,
            bred_for: breed.bred_for,
            breed_group: breed.breed_group,
            life_span: breed.life_span,
            temperament: breed.temperament,
            origin: breed.origin,
            weight_imperial: breed.weight_imperial,
            weight_metric: breed.weight_metric,
            height_imperial: breed.height_imperial,
            height_metric: breed.height_metric,
            created_at: breed.created_at,
            updated_at: breed.updated_at,
        };
    }
}

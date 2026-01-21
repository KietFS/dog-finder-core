import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CategoriesRepository } from './categories.repository';
import { CategoryQueryDto } from './dto/category-query.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { calculatePagination } from '../../common/utils/pagination.util';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async findAll(query: CategoryQueryDto): Promise<PaginationResponseDto<CategoryResponseDto>> {
        const { page = 1, limit = 10, ...filters } = query;
        const { skip, take } = calculatePagination(page, limit);

        const cacheKey = `categories:${JSON.stringify(query)}`;
        const cached = await this.cacheManager.get<PaginationResponseDto<CategoryResponseDto>>(
            cacheKey,
        );
        if (cached) {
            return cached;
        }

        const [categories, total] = await this.categoriesRepository.findAll(filters, skip, take);

        const response = new PaginationResponseDto(
            categories.map((category) => this.mapToResponseDto(category)),
            total,
            page,
            limit,
        );

        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    async findOne(id: number): Promise<CategoryResponseDto> {
        const cacheKey = `category:${id}`;
        const cached = await this.cacheManager.get<CategoryResponseDto>(cacheKey);
        if (cached) {
            return cached;
        }

        const category = await this.categoriesRepository.findById(id);

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        const response = this.mapToResponseDto(category);
        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    private mapToResponseDto(category: any): CategoryResponseDto {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            created_at: category.created_at,
            updated_at: category.updated_at,
        };
    }
}

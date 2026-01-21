import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ImagesRepository } from './images.repository';
import { ImageQueryDto } from './dto/image-query.dto';
import { ImageResponseDto } from './dto/image-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';
import { calculatePagination } from '../../common/utils/pagination.util';

@Injectable()
export class ImagesService {
    constructor(
        private readonly imagesRepository: ImagesRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async findAll(query: ImageQueryDto): Promise<PaginationResponseDto<ImageResponseDto>> {
        const { page = 1, limit = 10, ...filters } = query;
        const { skip, take } = calculatePagination(page, limit);

        const cacheKey = `images:${JSON.stringify(query)}`;
        const cached = await this.cacheManager.get<PaginationResponseDto<ImageResponseDto>>(cacheKey);
        if (cached) {
            return cached;
        }

        const [images, total] = await this.imagesRepository.findAll(filters, skip, take);

        const response = new PaginationResponseDto(
            images.map((image) => this.mapToResponseDto(image)),
            total,
            page,
            limit,
        );

        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    async findOne(id: number): Promise<ImageResponseDto> {
        const cacheKey = `image:${id}`;
        const cached = await this.cacheManager.get<ImageResponseDto>(cacheKey);
        if (cached) {
            return cached;
        }

        const image = await this.imagesRepository.findById(id);

        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }

        const response = this.mapToResponseDto(image);
        await this.cacheManager.set(cacheKey, response, 3600);

        return response;
    }

    private mapToResponseDto(image: any): ImageResponseDto {
        return {
            id: image.id,
            url: image.url,
            width: image.width,
            height: image.height,
            breed: image.breed
                ? {
                    id: image.breed.id,
                    name: image.breed.name,
                }
                : undefined,
            category: image.category
                ? {
                    id: image.category.id,
                    name: image.category.name,
                }
                : undefined,
            created_at: image.created_at,
            updated_at: image.updated_at,
        };
    }
}

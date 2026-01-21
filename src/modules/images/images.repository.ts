import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { IImageRepository } from './interfaces/image.interface';
import { ImageQueryDto } from './dto/image-query.dto';

@Injectable()
export class ImagesRepository implements IImageRepository {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
    ) { }

    async findAll(
        filters: ImageQueryDto,
        skip: number,
        take: number,
    ): Promise<[Image[], number]> {
        const where: any = {};

        if (filters.breed_id) {
            where.breed_id = filters.breed_id;
        }

        if (filters.category_id) {
            where.category_id = filters.category_id;
        }

        return this.imageRepository.findAndCount({
            where,
            relations: ['breed', 'category'],
            skip,
            take,
            order: { created_at: 'DESC' },
        });
    }

    async findById(id: number): Promise<Image | null> {
        return this.imageRepository.findOne({
            where: { id },
            relations: ['breed', 'category'],
        });
    }
}

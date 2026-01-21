import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Category } from './entities/category.entity';
import { ICategoryRepository } from './interfaces/category.interface';
import { CategoryQueryDto } from './dto/category-query.dto';

@Injectable()
export class CategoriesRepository implements ICategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async findAll(
        filters: CategoryQueryDto,
        skip: number,
        take: number,
    ): Promise<[Category[], number]> {
        const where: any = {};

        if (filters.name) {
            where.name = ILike(`%${filters.name}%`);
        }

        return this.categoryRepository.findAndCount({
            where,
            skip,
            take,
            order: { name: 'ASC' },
        });
    }

    async findById(id: number): Promise<Category | null> {
        return this.categoryRepository.findOne({ where: { id } });
    }
}

import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryQueryDto } from './dto/category-query.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all categories with filtering and pagination' })
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of categories',
        type: PaginationResponseDto,
    })
    async findAll(
        @Query() query: CategoryQueryDto,
    ): Promise<PaginationResponseDto<CategoryResponseDto>> {
        return this.categoriesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific category by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Category ID' })
    @ApiResponse({
        status: 200,
        description: 'Returns the category',
        type: CategoryResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Category not found',
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryResponseDto> {
        return this.categoriesService.findOne(id);
    }
}

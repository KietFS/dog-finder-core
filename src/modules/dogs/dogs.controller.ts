import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DogsService } from './dogs.service';
import { DogQueryDto } from './dto/dog-query.dto';
import { DogResponseDto } from './dto/dog-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all dogs with filtering and pagination' })
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of dogs',
        type: PaginationResponseDto,
    })
    async findAll(@Query() query: DogQueryDto): Promise<PaginationResponseDto<DogResponseDto>> {
        return this.dogsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific dog by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Dog ID' })
    @ApiResponse({
        status: 200,
        description: 'Returns the dog',
        type: DogResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Dog not found',
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<DogResponseDto> {
        return this.dogsService.findOne(id);
    }
}

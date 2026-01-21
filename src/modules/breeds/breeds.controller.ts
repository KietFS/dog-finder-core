import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BreedsService } from './breeds.service';
import { BreedQueryDto } from './dto/breed-query.dto';
import { BreedResponseDto } from './dto/breed-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('breeds')
@Controller('breeds')
export class BreedsController {
    constructor(private readonly breedsService: BreedsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all breeds with filtering and pagination' })
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of breeds',
        type: PaginationResponseDto,
    })
    async findAll(@Query() query: BreedQueryDto): Promise<PaginationResponseDto<BreedResponseDto>> {
        return this.breedsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific breed by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Breed ID' })
    @ApiResponse({
        status: 200,
        description: 'Returns the breed',
        type: BreedResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Breed not found',
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<BreedResponseDto> {
        return this.breedsService.findOne(id);
    }
}

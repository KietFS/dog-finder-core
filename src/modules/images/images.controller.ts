import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { ImageQueryDto } from './dto/image-query.dto';
import { ImageResponseDto } from './dto/image-response.dto';
import { PaginationResponseDto } from '../../common/dto/pagination-response.dto';

@ApiTags('images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all images with filtering and pagination' })
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of images',
        type: PaginationResponseDto,
    })
    async findAll(@Query() query: ImageQueryDto): Promise<PaginationResponseDto<ImageResponseDto>> {
        return this.imagesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific image by ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'Image ID' })
    @ApiResponse({
        status: 200,
        description: 'Returns the image',
        type: ImageResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Image not found',
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ImageResponseDto> {
        return this.imagesService.findOne(id);
    }
}

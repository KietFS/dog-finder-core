import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class BreedQueryDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Search breeds by name (partial match)',
        example: 'retriever',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'Filter by breed group',
        example: 'Sporting',
    })
    @IsOptional()
    @IsString()
    breed_group?: string;

    @ApiPropertyOptional({
        description: 'Filter by temperament (partial match)',
        example: 'friendly',
    })
    @IsOptional()
    @IsString()
    temperament?: string;

    @ApiPropertyOptional({
        description: 'Filter by origin',
        example: 'United Kingdom',
    })
    @IsOptional()
    @IsString()
    origin?: string;
}

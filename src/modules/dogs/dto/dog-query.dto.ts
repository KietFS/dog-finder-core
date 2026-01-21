import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class DogQueryDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by breed ID',
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    breed_id?: number;

    @ApiPropertyOptional({
        description: 'Filter by size',
        enum: ['small', 'medium', 'large'],
        example: 'large',
    })
    @IsOptional()
    @IsString()
    @IsIn(['small', 'medium', 'large'])
    size?: string;

    @ApiPropertyOptional({
        description: 'Filter by temperament (partial match)',
        example: 'friendly',
    })
    @IsOptional()
    @IsString()
    temperament?: string;

    @ApiPropertyOptional({
        description: 'Filter by minimum age',
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    min_age?: number;

    @ApiPropertyOptional({
        description: 'Filter by maximum age',
        example: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    max_age?: number;
}

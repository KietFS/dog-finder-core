import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class ImageQueryDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by breed ID',
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    breed_id?: number;

    @ApiPropertyOptional({
        description: 'Filter by category ID',
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    category_id?: number;
}

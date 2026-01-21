import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CategoryQueryDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Search categories by name (partial match)',
        example: 'puppy',
    })
    @IsOptional()
    @IsString()
    name?: string;
}

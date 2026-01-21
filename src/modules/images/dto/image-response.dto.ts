import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BreedSummaryDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Golden Retriever' })
    name: string;
}

class CategorySummaryDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Puppies' })
    name: string;
}

export class ImageResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg' })
    url: string;

    @ApiPropertyOptional({ example: 1600 })
    width?: number;

    @ApiPropertyOptional({ example: 1200 })
    height?: number;

    @ApiPropertyOptional({ type: BreedSummaryDto })
    breed?: BreedSummaryDto;

    @ApiPropertyOptional({ type: CategorySummaryDto })
    category?: CategorySummaryDto;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;
}

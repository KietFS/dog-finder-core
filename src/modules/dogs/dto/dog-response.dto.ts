import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BreedSummaryDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Golden Retriever' })
    name: string;

    @ApiPropertyOptional({ example: 'Intelligent, Friendly' })
    temperament?: string;
}

class ImageSummaryDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg' })
    url: string;
}

export class DogResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Max' })
    name: string;

    @ApiProperty({ type: BreedSummaryDto })
    breed: BreedSummaryDto;

    @ApiPropertyOptional({ type: ImageSummaryDto })
    image?: ImageSummaryDto;

    @ApiPropertyOptional({ example: 'large' })
    size?: string;

    @ApiPropertyOptional({ example: 3 })
    age?: number;

    @ApiPropertyOptional({ example: 'Friendly, Energetic' })
    temperament?: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;
}

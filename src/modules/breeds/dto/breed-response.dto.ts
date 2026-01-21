import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BreedResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Golden Retriever' })
    name: string;

    @ApiPropertyOptional({ example: 'Hunting, retrieving game' })
    bred_for?: string;

    @ApiPropertyOptional({ example: 'Sporting' })
    breed_group?: string;

    @ApiPropertyOptional({ example: '10 - 12 years' })
    life_span?: string;

    @ApiPropertyOptional({ example: 'Intelligent, Friendly, Devoted, Trustworthy' })
    temperament?: string;

    @ApiPropertyOptional({ example: 'United Kingdom, Scotland' })
    origin?: string;

    @ApiPropertyOptional({ example: '55 - 75 pounds' })
    weight_imperial?: string;

    @ApiPropertyOptional({ example: '25 - 34 kg' })
    weight_metric?: string;

    @ApiPropertyOptional({ example: '20 - 24 inches' })
    height_imperial?: string;

    @ApiPropertyOptional({ example: '51 - 61 cm' })
    height_metric?: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;
}

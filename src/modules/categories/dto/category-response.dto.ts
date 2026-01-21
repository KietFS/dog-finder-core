import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Puppies' })
    name: string;

    @ApiPropertyOptional({ example: 'Adorable puppy images' })
    description?: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    created_at: Date;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updated_at: Date;
}

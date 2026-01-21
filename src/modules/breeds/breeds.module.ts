import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsController } from './breeds.controller';
import { BreedsService } from './breeds.service';
import { BreedsRepository } from './breeds.repository';
import { Breed } from './entities/breed.entity';
import { CacheConfigModule } from '../../cache/cache.module';

@Module({
    imports: [TypeOrmModule.forFeature([Breed]), CacheConfigModule],
    controllers: [BreedsController],
    providers: [BreedsService, BreedsRepository],
    exports: [BreedsService, BreedsRepository],
})
export class BreedsModule { }

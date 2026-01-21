import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { DogsRepository } from './dogs.repository';
import { Dog } from './entities/dog.entity';
import { CacheConfigModule } from '../../cache/cache.module';

@Module({
    imports: [TypeOrmModule.forFeature([Dog]), CacheConfigModule],
    controllers: [DogsController],
    providers: [DogsService, DogsRepository],
    exports: [DogsService, DogsRepository],
})
export class DogsModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImagesRepository } from './images.repository';
import { Image } from './entities/image.entity';
import { CacheConfigModule } from '../../cache/cache.module';

@Module({
    imports: [TypeOrmModule.forFeature([Image]), CacheConfigModule],
    controllers: [ImagesController],
    providers: [ImagesService, ImagesRepository],
    exports: [ImagesService, ImagesRepository],
})
export class ImagesModule { }

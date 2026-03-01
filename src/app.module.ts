import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CacheConfigModule } from './cache/cache.module';
import { BreedsModule } from './modules/breeds/breeds.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ImagesModule } from './modules/images/images.module';
import { DogsModule } from './modules/dogs/dogs.module';
import { HealthModule } from './health/health.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        DatabaseModule,
        CacheConfigModule,
        BreedsModule,
        CategoriesModule,
        ImagesModule,
        DogsModule,
        HealthModule,
    ],
})
export class AppModule { }

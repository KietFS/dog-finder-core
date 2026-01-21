import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from '../config/redis.config';

@Module({
    imports: [CacheModule.register(redisConfig)],
    exports: [CacheModule],
})
export class CacheConfigModule { }

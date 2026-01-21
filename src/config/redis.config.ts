import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

export const redisConfig: CacheModuleOptions = {
    // @ts-ignore
    store: async () =>
        await redisStore({
            socket: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            },
            ttl: parseInt(process.env.REDIS_TTL, 10) || 3600,
        }),
    isGlobal: true,
};

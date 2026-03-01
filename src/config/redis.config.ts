import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

const isTlsEnabled = process.env.REDIS_TLS === 'true';

export const redisConfig: CacheModuleOptions = {
    // @ts-ignore
    store: async () =>
        await redisStore({
            socket: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT, 10) || 6379,
                // Enable TLS for AWS ElastiCache with in-transit encryption
                tls: isTlsEnabled,
                // Reconnect strategy: retry up to 10 times with backoff
                reconnectStrategy: (retries: number) => {
                    if (retries > 10) return new Error('Redis max retries reached');
                    return Math.min(retries * 100, 3000);
                },
            },
            ttl: parseInt(process.env.REDIS_TTL, 10) || 3600,
        }),
    isGlobal: true,
};

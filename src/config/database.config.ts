import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'dog_finder_db',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: !isProduction,   // true in dev (auto-sync schema), false in prod (use migrations)
    logging: process.env.DB_LOGGING === 'true',
    // SSL is required for AWS RDS connections in production
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    // Connection pool tuning for production
    extra: isProduction
        ? {
            max: 10,             // max pool connections
            min: 2,              // min pool connections
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
        }
        : {},
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

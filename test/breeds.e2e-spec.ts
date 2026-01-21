import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BreedsController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
            }),
        );
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/api/v1/breeds (GET)', () => {
        it('should return paginated breeds', () => {
            return request(app.getHttpServer())
                .get('/api/v1/breeds')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('meta');
                    expect(Array.isArray(res.body.data)).toBe(true);
                    expect(res.body.meta).toHaveProperty('page');
                    expect(res.body.meta).toHaveProperty('limit');
                    expect(res.body.meta).toHaveProperty('total');
                });
        });

        it('should filter breeds by name', () => {
            return request(app.getHttpServer())
                .get('/api/v1/breeds?name=retriever')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data).toBeDefined();
                });
        });

        it('should paginate results', () => {
            return request(app.getHttpServer())
                .get('/api/v1/breeds?page=1&limit=5')
                .expect(200)
                .expect((res) => {
                    expect(res.body.meta.page).toBe(1);
                    expect(res.body.meta.limit).toBe(5);
                });
        });

        it('should validate pagination parameters', () => {
            return request(app.getHttpServer())
                .get('/api/v1/breeds?page=0&limit=200')
                .expect(400);
        });
    });

    describe('/api/v1/breeds/:id (GET)', () => {
        it('should return a specific breed', () => {
            return request(app.getHttpServer())
                .get('/api/v1/breeds/1')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data).toHaveProperty('id');
                    expect(res.body.data).toHaveProperty('name');
                });
        });

        it('should return 404 for non-existent breed', () => {
            return request(app.getHttpServer()).get('/api/v1/breeds/99999').expect(404);
        });

        it('should validate id parameter', () => {
            return request(app.getHttpServer()).get('/api/v1/breeds/invalid').expect(400);
        });
    });
});

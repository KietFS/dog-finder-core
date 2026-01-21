import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DogsController (e2e)', () => {
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

    describe('/api/v1/dogs (GET)', () => {
        it('should return paginated dogs', () => {
            return request(app.getHttpServer())
                .get('/api/v1/dogs')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('meta');
                    expect(Array.isArray(res.body.data)).toBe(true);
                });
        });

        it('should filter dogs by breed_id', () => {
            return request(app.getHttpServer())
                .get('/api/v1/dogs?breed_id=1')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data).toBeDefined();
                });
        });

        it('should filter dogs by size', () => {
            return request(app.getHttpServer())
                .get('/api/v1/dogs?size=large')
                .expect(200);
        });

        it('should validate size enum', () => {
            return request(app.getHttpServer())
                .get('/api/v1/dogs?size=invalid')
                .expect(400);
        });

        it('should filter dogs by age range', () => {
            return request(app.getHttpServer())
                .get('/api/v1/dogs?min_age=1&max_age=5')
                .expect(200);
        });
    });

    describe('/api/v1/dogs/:id (GET)', () => {
        it('should return a specific dog with breed and image', () => {
            return request(app.getHttpServer())
                .get('/api/v1/dogs/1')
                .expect(200)
                .expect((res) => {
                    expect(res.body.data).toHaveProperty('id');
                    expect(res.body.data).toHaveProperty('name');
                    expect(res.body.data).toHaveProperty('breed');
                });
        });

        it('should return 404 for non-existent dog', () => {
            return request(app.getHttpServer()).get('/api/v1/dogs/99999').expect(404);
        });
    });
});

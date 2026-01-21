import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE || 'Dog Finder API')
        .setDescription(
            process.env.SWAGGER_DESCRIPTION ||
            'Production-ready RESTful API that mimics TheDogAPI with enterprise-grade architecture',
        )
        .setVersion(process.env.SWAGGER_VERSION || '1.0')
        .addTag('breeds', 'Dog breeds endpoints')
        .addTag('categories', 'Image categories endpoints')
        .addTag('images', 'Dog images endpoints')
        .addTag('dogs', 'Dogs endpoints')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.SWAGGER_PATH || 'api', app, document, {
        customSiteTitle: 'Dog Finder API Documentation',
        customCss: '.swagger-ui .topbar { display: none }',
    });
}

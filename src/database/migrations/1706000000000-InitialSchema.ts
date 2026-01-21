import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1706000000000 implements MigrationInterface {
  name = 'InitialSchema1706000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create breeds table
    await queryRunner.query(`
      CREATE TABLE "breeds" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL UNIQUE,
        "bred_for" VARCHAR,
        "breed_group" VARCHAR,
        "life_span" VARCHAR,
        "temperament" TEXT,
        "origin" VARCHAR,
        "weight_imperial" VARCHAR,
        "weight_metric" VARCHAR,
        "height_imperial" VARCHAR,
        "height_metric" VARCHAR,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Create categories table
    await queryRunner.query(`
      CREATE TABLE "categories" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL UNIQUE,
        "description" TEXT,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Create images table
    await queryRunner.query(`
      CREATE TABLE "images" (
        "id" SERIAL PRIMARY KEY,
        "url" VARCHAR NOT NULL,
        "width" INTEGER,
        "height" INTEGER,
        "breed_id" INTEGER,
        "category_id" INTEGER,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_images_breed" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE SET NULL,
        CONSTRAINT "fk_images_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL
      )
    `);

    // Create dogs table
    await queryRunner.query(`
      CREATE TABLE "dogs" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "breed_id" INTEGER NOT NULL,
        "image_id" INTEGER,
        "size" VARCHAR,
        "age" INTEGER,
        "temperament" TEXT,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_dogs_breed" FOREIGN KEY ("breed_id") REFERENCES "breeds"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_dogs_image" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL
      )
    `);

    // Create indexes for better query performance
    await queryRunner.query(`CREATE INDEX "idx_breeds_name" ON "breeds"("name")`);
    await queryRunner.query(`CREATE INDEX "idx_breeds_breed_group" ON "breeds"("breed_group")`);
    await queryRunner.query(`CREATE INDEX "idx_categories_name" ON "categories"("name")`);
    await queryRunner.query(`CREATE INDEX "idx_images_breed_id" ON "images"("breed_id")`);
    await queryRunner.query(`CREATE INDEX "idx_images_category_id" ON "images"("category_id")`);
    await queryRunner.query(`CREATE INDEX "idx_dogs_breed_id" ON "dogs"("breed_id")`);
    await queryRunner.query(`CREATE INDEX "idx_dogs_size" ON "dogs"("size")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dogs"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "breeds"`);
  }
}

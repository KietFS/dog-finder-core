import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Breed } from 'src/modules/breeds/entities/breed.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Dog } from 'src/modules/dogs/entities/dog.entity';

config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'dog_finder_db',
    entities: [Breed, Category, Image, Dog],
    synchronize: false,
});

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log('✅ Database connection established');

        // Clear existing data
        await AppDataSource.getRepository(Dog).delete({});
        await AppDataSource.getRepository(Image).delete({});
        await AppDataSource.getRepository(Breed).delete({});
        await AppDataSource.getRepository(Category).delete({});
        console.log('🗑️  Cleared existing data');

        // Seed Categories
        const categories = await AppDataSource.getRepository(Category).save([
            { name: 'Puppies', description: 'Adorable puppy images' },
            { name: 'Adults', description: 'Adult dog images' },
            { name: 'Action', description: 'Dogs in action' },
            { name: 'Portraits', description: 'Dog portrait photos' },
        ]);
        console.log('✅ Seeded categories');

        // Seed Breeds
        const breeds = await AppDataSource.getRepository(Breed).save([
            {
                name: 'Golden Retriever',
                bred_for: 'Hunting, retrieving game',
                breed_group: 'Sporting',
                life_span: '10 - 12 years',
                temperament: 'Intelligent, Friendly, Devoted, Trustworthy',
                origin: 'United Kingdom, Scotland',
                weight_imperial: '55 - 75 pounds',
                weight_metric: '25 - 34 kg',
                height_imperial: '20 - 24 inches',
                height_metric: '51 - 61 cm',
            },
            {
                name: 'German Shepherd',
                bred_for: 'Herding, guarding',
                breed_group: 'Herding',
                life_span: '9 - 13 years',
                temperament: 'Intelligent, Confident, Courageous, Loyal',
                origin: 'Germany',
                weight_imperial: '50 - 90 pounds',
                weight_metric: '22 - 40 kg',
                height_imperial: '22 - 26 inches',
                height_metric: '55 - 65 cm',
            },
            {
                name: 'Labrador Retriever',
                bred_for: 'Water retrieving',
                breed_group: 'Sporting',
                life_span: '10 - 13 years',
                temperament: 'Outgoing, Even Tempered, Gentle, Agile, Intelligent',
                origin: 'Canada',
                weight_imperial: '55 - 80 pounds',
                weight_metric: '25 - 36 kg',
                height_imperial: '21 - 24 inches',
                height_metric: '54 - 57 cm',
            },
            {
                name: 'Bulldog',
                bred_for: 'Bull baiting, companion',
                breed_group: 'Non-Sporting',
                life_span: '8 - 10 years',
                temperament: 'Friendly, Courageous, Calm',
                origin: 'United Kingdom, England',
                weight_imperial: '40 - 50 pounds',
                weight_metric: '18 - 23 kg',
                height_imperial: '12 - 16 inches',
                height_metric: '31 - 40 cm',
            },
            {
                name: 'Beagle',
                bred_for: 'Hunting rabbits, hares',
                breed_group: 'Hound',
                life_span: '12 - 15 years',
                temperament: 'Amiable, Even Tempered, Excitable, Determined, Gentle',
                origin: 'United Kingdom, England',
                weight_imperial: '20 - 30 pounds',
                weight_metric: '9 - 14 kg',
                height_imperial: '13 - 16 inches',
                height_metric: '33 - 41 cm',
            },
        ]);
        console.log('✅ Seeded breeds');

        // Seed Images
        const images = await AppDataSource.getRepository(Image).save([
            {
                url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
                width: 1600,
                height: 1199,
                breed_id: breeds[0].id,
                category_id: categories[0].id,
            },
            {
                url: 'https://cdn2.thedogapi.com/images/SyZNlxc4m.jpg',
                width: 1920,
                height: 1080,
                breed_id: breeds[1].id,
                category_id: categories[1].id,
            },
            {
                url: 'https://cdn2.thedogapi.com/images/B1CJlx9EQ.jpg',
                width: 1600,
                height: 1200,
                breed_id: breeds[2].id,
                category_id: categories[2].id,
            },
            {
                url: 'https://cdn2.thedogapi.com/images/HyOjge5Vm.jpg',
                width: 1280,
                height: 853,
                breed_id: breeds[3].id,
                category_id: categories[3].id,
            },
            {
                url: 'https://cdn2.thedogapi.com/images/Syd4xxqEm.jpg',
                width: 1600,
                height: 1067,
                breed_id: breeds[4].id,
                category_id: categories[0].id,
            },
        ]);
        console.log('✅ Seeded images');

        // Seed Dogs
        await AppDataSource.getRepository(Dog).save([
            {
                name: 'Max',
                breed_id: breeds[0].id,
                image_id: images[0].id,
                size: 'large',
                age: 3,
                temperament: 'Friendly, Energetic',
            },
            {
                name: 'Buddy',
                breed_id: breeds[1].id,
                image_id: images[1].id,
                size: 'large',
                age: 5,
                temperament: 'Loyal, Protective',
            },
            {
                name: 'Charlie',
                breed_id: breeds[2].id,
                image_id: images[2].id,
                size: 'large',
                age: 2,
                temperament: 'Playful, Gentle',
            },
            {
                name: 'Rocky',
                breed_id: breeds[3].id,
                image_id: images[3].id,
                size: 'medium',
                age: 4,
                temperament: 'Calm, Friendly',
            },
            {
                name: 'Cooper',
                breed_id: breeds[4].id,
                image_id: images[4].id,
                size: 'small',
                age: 1,
                temperament: 'Curious, Energetic',
            },
        ]);
        console.log('✅ Seeded dogs');

        console.log('🎉 Database seeding completed successfully!');
        await AppDataSource.destroy();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();

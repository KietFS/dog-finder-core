export const mockBreeds = [
    {
        id: 1,
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
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
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
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export const mockCategories = [
    {
        id: 1,
        name: 'Puppies',
        description: 'Adorable puppy images',
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        name: 'Adults',
        description: 'Adult dog images',
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export const mockImages = [
    {
        id: 1,
        url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
        width: 1600,
        height: 1199,
        breed_id: 1,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export const mockDogs = [
    {
        id: 1,
        name: 'Max',
        breed_id: 1,
        image_id: 1,
        size: 'large',
        age: 3,
        temperament: 'Friendly, Energetic',
        created_at: new Date(),
        updated_at: new Date(),
    },
];

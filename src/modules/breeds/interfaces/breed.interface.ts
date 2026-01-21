export interface IBreed {
    id: number;
    name: string;
    bred_for?: string;
    breed_group?: string;
    life_span?: string;
    temperament?: string;
    origin?: string;
    weight_imperial?: string;
    weight_metric?: string;
    height_imperial?: string;
    height_metric?: string;
    created_at: Date;
    updated_at: Date;
}

export interface IBreedRepository {
    findAll(filters: any, skip: number, take: number): Promise<[IBreed[], number]>;
    findById(id: number): Promise<IBreed | null>;
}

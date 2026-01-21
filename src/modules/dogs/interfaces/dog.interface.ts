export interface IDog {
    id: number;
    name: string;
    breed_id: number;
    image_id?: number;
    size?: string;
    age?: number;
    temperament?: string;
    created_at: Date;
    updated_at: Date;
}

export interface IDogRepository {
    findAll(filters: any, skip: number, take: number): Promise<[IDog[], number]>;
    findById(id: number): Promise<IDog | null>;
}

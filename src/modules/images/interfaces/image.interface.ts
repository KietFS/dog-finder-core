export interface IImage {
    id: number;
    url: string;
    width?: number;
    height?: number;
    breed_id?: number;
    category_id?: number;
    created_at: Date;
    updated_at: Date;
}

export interface IImageRepository {
    findAll(filters: any, skip: number, take: number): Promise<[IImage[], number]>;
    findById(id: number): Promise<IImage | null>;
}

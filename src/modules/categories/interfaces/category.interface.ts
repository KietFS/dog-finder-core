export interface ICategory {
    id: number;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICategoryRepository {
    findAll(filters: any, skip: number, take: number): Promise<[ICategory[], number]>;
    findById(id: number): Promise<ICategory | null>;
}

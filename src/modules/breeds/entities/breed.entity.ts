import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { Dog } from '../../dogs/entities/dog.entity';

@Entity('breeds')
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    bred_for: string;

    @Column({ nullable: true })
    breed_group: string;

    @Column({ nullable: true })
    life_span: string;

    @Column({ type: 'text', nullable: true })
    temperament: string;

    @Column({ nullable: true })
    origin: string;

    @Column({ nullable: true })
    weight_imperial: string;

    @Column({ nullable: true })
    weight_metric: string;

    @Column({ nullable: true })
    height_imperial: string;

    @Column({ nullable: true })
    height_metric: string;

    @OneToMany(() => Image, (image) => image.breed)
    images: Image[];

    @OneToMany(() => Dog, (dog) => dog.breed)
    dogs: Dog[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

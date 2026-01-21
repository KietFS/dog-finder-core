import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Breed } from '../../breeds/entities/breed.entity';
import { Category } from '../../categories/entities/category.entity';
import { Dog } from '../../dogs/entities/dog.entity';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ type: 'int', nullable: true })
    width: number;

    @Column({ type: 'int', nullable: true })
    height: number;

    @Column({ nullable: true })
    breed_id: number;

    @ManyToOne(() => Breed, (breed) => breed.images, { nullable: true })
    @JoinColumn({ name: 'breed_id' })
    breed: Breed;

    @Column({ nullable: true })
    category_id: number;

    @ManyToOne(() => Category, (category) => category.images, { nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToOne(() => Dog, (dog) => dog.image)
    dog: Dog;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

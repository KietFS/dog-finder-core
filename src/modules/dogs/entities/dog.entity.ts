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
import { Image } from '../../images/entities/image.entity';

@Entity('dogs')
export class Dog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    breed_id: number;

    @ManyToOne(() => Breed, (breed) => breed.dogs)
    @JoinColumn({ name: 'breed_id' })
    breed: Breed;

    @Column({ nullable: true })
    image_id: number;

    @OneToOne(() => Image, (image) => image.dog, { nullable: true })
    @JoinColumn({ name: 'image_id' })
    image: Image;

    @Column({ nullable: true })
    size: string; // small, medium, large

    @Column({ type: 'int', nullable: true })
    age: number;

    @Column({ type: 'text', nullable: true })
    temperament: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({type: 'text'})
    description: string;

    @Column()
    image_url: string;

    @Column()
    price: number;
}

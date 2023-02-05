import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', })
    name: string;
}

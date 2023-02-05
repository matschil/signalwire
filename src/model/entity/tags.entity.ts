import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity()
export class TagsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', })
    tag: string;

    @Column({ type: 'integer', })
    count: number;
}

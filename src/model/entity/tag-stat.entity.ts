import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TagStatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', })
    tag: string;

    @Column({ type: 'integer', })
    count: number;
}

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['tag'])
@Entity()
export class TagStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  tag: string;

  @Column({ type: 'integer' })
  count: number;
}

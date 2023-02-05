import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketEntity {
  // Id not required for use-case - typeORM needs one to init schema
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  user_id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({
    type: 'timestamptz',
    precision: 3,
    default: () => 'NOW()',
  })
  received_at: Date;
}

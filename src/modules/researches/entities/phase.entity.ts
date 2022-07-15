import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Phase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  value: string;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TargetSizeGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  value: string;
}

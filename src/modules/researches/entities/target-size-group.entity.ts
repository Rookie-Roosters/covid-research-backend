import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TargetSizeGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  value: string;
}

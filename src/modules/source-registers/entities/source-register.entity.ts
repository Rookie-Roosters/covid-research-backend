import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SourceRegister {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  value: string;
}

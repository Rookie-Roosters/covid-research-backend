import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecruitmentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  value: string;
}

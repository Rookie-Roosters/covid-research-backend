import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  value: string;
}

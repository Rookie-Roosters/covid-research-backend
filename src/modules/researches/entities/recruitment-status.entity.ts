import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecruitmentStatus {
  @ApiProperty({description: "Recruiment Status primary key"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({description: "Recruiment Status value"})
  @Column({ type: 'varchar', length: 32 })
  value: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Phase {
  @ApiProperty({description: "Phase's primary key"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({description: "Phases"})
  @Column({ type: 'varchar', length: 64 })
  value: string;
}

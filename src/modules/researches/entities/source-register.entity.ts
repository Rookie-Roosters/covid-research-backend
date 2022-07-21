import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SourceRegister {
    @ApiProperty({ description: 'Source Register primary key' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Source Register value' })
    @Column({ type: 'varchar', length: 64 })
    value: string;
}

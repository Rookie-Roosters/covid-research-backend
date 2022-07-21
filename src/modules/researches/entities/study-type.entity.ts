import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudyType {
    @ApiProperty({ description: 'Study Type primary key' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Study Type value' })
    @Column({ type: 'varchar', length: 64 })
    value: string;
}

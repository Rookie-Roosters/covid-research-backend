import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class Bookmark extends BaseEntity {
    @ApiProperty({ description: "Bookmark's primary key" })
    @PrimaryGeneratedColumn()
    id: number;
}

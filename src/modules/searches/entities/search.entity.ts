import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class Search extends BaseEntity {
    @ApiProperty({ description: "Search's primary key" })
    @PrimaryGeneratedColumn()
    id: number;
}

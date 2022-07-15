import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Research extends BaseEntity {
    @ApiProperty({ description: "Research's primary key" })
    @PrimaryGeneratedColumn()
    id: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
    @ApiProperty({ description: "Role's primary key" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: "Role's identifier name" })
    @Index({ unique: true })
    @Column({ length: 32 })
    name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, Length } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
    @ApiProperty({ description: "Role's primary key" })
    @IsInt()
    @IsPositive()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: "Role's identifier name" })
    @IsString()
    @Length(1, 32)
    @Index({ unique: true })
    @Column({ length: 32 })
    name: string;
}

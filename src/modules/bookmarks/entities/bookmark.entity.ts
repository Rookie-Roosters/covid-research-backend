import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Research } from '@researches/entities';
import { User } from '@users/entities';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bookmark {
    @ApiProperty({ description: "Bookmark's primary key" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description: "Bookmark's name"})
    @Column({type: 'varchar', length: 64})
    name: string;

    @ApiProperty({description: "Bookmark's user owner"})
    @ManyToOne(() => User)
    user: User;

    @ApiProperty({description: "Bookmark's researches"})
    @ManyToMany(() => Research)
    @JoinTable()
    researches: Research[];
}

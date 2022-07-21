import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
    @ApiProperty({ description: "History's primary key", type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: "History's url", type: String })
    @Column({ type: 'varchar', length: 1024 })
    url: string;

    @ApiProperty({ description: 'History owner user' })
    @ManyToOne(() => User)
    user: User;
}

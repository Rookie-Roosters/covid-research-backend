import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BoolBitTransformer } from '@utils/transformers';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
    @ApiProperty({ description: "User's primary key" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: "User's login email" })
    @Index({ unique: true })
    @Column({ length: 64 })
    email: string;

    @ApiProperty({ description: "User's first name" })
    @Column({ length: 32 })
    firstName: string;

    @ApiProperty({ description: "User's last name" })
    @Column({ length: 32 })
    lastName: string;

    @ApiHideProperty()
    @Column({ length: 32, select: false })
    password: string;

    @ApiProperty({ description: 'Whether user has Admin permissions' })
    @Column({ type: 'bit', transformer: new BoolBitTransformer(), default: false })
    isAdmin: boolean;
}

import { USER_ROLE } from '@authentication/constants';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsPositive, IsString, Length } from 'class-validator';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
@Entity()
export class User {
    @ApiProperty({ description: "User's primary key" })
    @IsInt()
    @IsPositive()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: "User's login email" })
    @IsEmail()
    @Length(1, 64)
    @Index({ unique: true })
    @Column({ length: 64 })
    email: string;

    @ApiProperty({ description: "User's first name" })
    @IsString()
    @Length(1, 32)
    @Column({ length: 32 })
    firstName: string;

    @ApiProperty({ description: "User's last name" })
    @IsString()
    @Length(1, 32)
    @Column({ length: 32 })
    lastName: string;

    @ApiHideProperty()
    @Column({ length: 32 })
    password: string;

    @ApiHideProperty()
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    isAdmin(): boolean {
        const find = this.roles.find((role) => role.name == USER_ROLE.ADMIN);
        return find !== undefined;
    }
}

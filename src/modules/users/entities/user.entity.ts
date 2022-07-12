import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: 'ola' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 32 })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 64 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 64 })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 64 })
  firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 64 })
  lastName: string;
}

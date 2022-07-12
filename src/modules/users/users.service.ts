import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(dto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  // async update(id: number, dto: UpdateUserDto): Promise<User> {
  //   const user = await this.usersRepository.findOneBy({ id });
  //   if (!user) throw new NotFoundException('User not found');

  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

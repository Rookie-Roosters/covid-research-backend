import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto, UserUpdateDto } from '@users/dto';
import { User } from '@users/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(userCreateDto: UserCreateDto): Promise<User> {
        const user = this.usersRepository.create(userCreateDto);
        await this.usersRepository.insert(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
        const user = await this.usersRepository.preload({ id, ...userUpdateDto });
        if (!user) throw new NotFoundException('User not found');
        await this.usersRepository.update({ id }, userUpdateDto);
        return user;
    }

    async remove(id: number): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        await this.usersRepository.remove(user);
    }
}

import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';
import { UserCreateDto, UserUpdateDto } from '@users/dto';
import { Role, User } from '@users/entities';
import { Repository } from 'typeorm';
import { USER_ROLE_VALUES } from '@authentication/constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async create(userCreateDto: UserCreateDto): Promise<User> {
        const { roles: rolesNames, ...userDto } = userCreateDto;
        const user = this.usersRepository.create(userDto);
        const roles = await this.validateUserRoles(rolesNames);
        const [err] = await to(this.usersRepository.save({ ...user, roles }));
        if (err) throw new ConflictException('An User with this email already exists', err.message);
        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users;
    }

    async findOne(emailOrId: number | string, populate = false): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: typeof emailOrId === 'string' ? { email: emailOrId } : { id: emailOrId },
            relations: populate ? ['roles'] : [],
        });
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

    async syncUserRoles(): Promise<void> {
        const [err] = await to(this.validateUserRoles(USER_ROLE_VALUES, true));
        if (err) throw new InternalServerErrorException('Could not sync roles into database', err.message);
        console.log('User Roles synced');
    }

    private async validateUserRoles(roles: string[], generate = false): Promise<Role[]> {
        const data = await Promise.all(
            roles.map(async (roleName) => {
                const role = await this.rolesRepository.findOneBy({ name: roleName });
                if (!role) {
                    if (generate) await this.rolesRepository.insert({ name: roleName });
                    else throw new BadRequestException('Invalid User Role');
                }
                return role;
            }),
        );
        return data;
    }
}

import { USER_ROLE } from '@authentication/constants';
import { UserSignUpDto } from '@authentication/dto';
import { IAuthTokenResponse, IDecodedToken } from '@authentication/interfaces';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/entities';
import { UsersService } from '@users/services';

@Injectable()
export class AuthenticationService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(email, true);
        if (!user) throw new NotFoundException('User not found');
        if (user && user.password !== password) throw new UnauthorizedException('Invalid credentials');
        return user;
    }

    async validateUserByToken(payload: IDecodedToken): Promise<User> {
        const user = await this.usersService.findOne(payload.userId, true);
        if (!user) throw new NotFoundException('User not longer exists');
        return user;
    }

    async logIn(user: User): Promise<IAuthTokenResponse> {
        const payload: IDecodedToken = {
            userId: user.id,
            email: user.email,
        };
        return {
            user,
            authToken: this.jwtService.sign(payload),
        };
    }

    async signUp(userSignUpDto: UserSignUpDto): Promise<IAuthTokenResponse> {
        const user = await this.usersService.create({ ...userSignUpDto, roles: [USER_ROLE.REGULAR] });
        const payload: IDecodedToken = {
            userId: user.id,
            email: user.email,
        };
        return {
            user,
            authToken: this.jwtService.sign(payload),
        };
    }
}

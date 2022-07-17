import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/services';

@Injectable()
export class AuthenticationService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === password) return user;
        return null;
    }

    async logIn(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

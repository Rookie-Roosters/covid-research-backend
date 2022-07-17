import { USER_ROLES } from '@authentication/constants';
import { Authenticated, CurrentUser } from '@authentication/decorators';
import { LogInUserDto } from '@authentication/dto/user-login.dto';
import { LocalAuthGuard } from '@authentication/guards';
import { AuthenticationService } from '@authentication/services';
import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@users/entities';
import { API_ENDPOINTS } from '@utils/constants';
import { ICommonHttpResponse } from '@utils/interfaces';

@ApiTags('Authentication')
@Controller(API_ENDPOINTS.AUTHENTICATION.BASE_PATH)
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post(API_ENDPOINTS.AUTHENTICATION.LOG_IN)
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LogInUserDto })
    async logIn(@CurrentUser() currentUser: User): Promise<ICommonHttpResponse> {
        const res = await this.authenticationService.logIn(currentUser);
        return { data: res };
    }

    @Get('profile')
    @Authenticated(USER_ROLES.REGULAR, USER_ROLES.ADMIN)
    async getProfile(@CurrentUser() currentUser: User): Promise<ICommonHttpResponse<User>> {
        return { data: currentUser };
    }
}

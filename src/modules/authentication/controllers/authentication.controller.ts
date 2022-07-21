import { CurrentUser } from '@authentication/decorators';
import { UserLogInDto, UserSignUpDto } from '@authentication/dto';
import { LocalAuthGuard } from '@authentication/guards';
import { IAuthTokenResponse } from '@authentication/interfaces';
import { AuthenticationService } from '@authentication/services';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
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
    @ApiBody({ type: UserLogInDto })
    async logIn(@CurrentUser() currentUser: User): Promise<ICommonHttpResponse<IAuthTokenResponse>> {
        const res = await this.authenticationService.logIn(currentUser);
        return { data: res };
    }

    @Post(API_ENDPOINTS.AUTHENTICATION.SIGN_UP)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UserSignUpDto })
    async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<ICommonHttpResponse<IAuthTokenResponse>> {
        const res = await this.authenticationService.signUp(userSignUpDto);
        return { data: res };
    }
}

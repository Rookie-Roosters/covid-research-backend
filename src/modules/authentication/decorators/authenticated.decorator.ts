import { USER_ROLES } from '@authentication/constants';
import { JwtAuthGuard } from '@authentication/guards';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Authenticated(...roles: USER_ROLES[]) {
    return applyDecorators(
        ApiBearerAuth(),
        SetMetadata('roles', roles),
        UseGuards(JwtAuthGuard), //AuthGuard, RolesGuard
        ApiUnauthorizedResponse(),
    );
}

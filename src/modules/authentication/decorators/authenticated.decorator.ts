import { USER_ROLE } from '@authentication/constants';
import { JwtAuthGuard, RolesGuard } from '@authentication/guards';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from './roles.decorator';

export function Authenticated(...roles: USER_ROLE[]) {
    return applyDecorators(ApiBearerAuth(), Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard), ApiUnauthorizedResponse());
}

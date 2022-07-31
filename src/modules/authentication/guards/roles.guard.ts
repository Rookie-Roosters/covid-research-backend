import { USER_ROLE } from '@authentication/constants';
import { ROLES_KEY } from '@authentication/decorators';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@users/entities';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) return true;
        const { user } = context.switchToHttp().getRequest();
        const hasRoles = requiredRoles.some((requiredRole) => user.roles.find((role: Role) => role.name == requiredRole));
        if (!hasRoles) throw new UnauthorizedException("User doesn't have the required role");
        return true;
    }
}

import { Injectable, CanActivate, ExecutionContext, Inject, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GLOBAL_PROVIDERS } from '@shared/global/constants';

@Injectable()
export class DevelopmentOnlyGuard implements CanActivate {
    constructor(
        @Inject(GLOBAL_PROVIDERS.IS_DEVELOPMENT_ENV)
        private readonly isDevelopmentEnv: boolean,
        private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        if (this.isDevelopmentEnv) return true;
        throw new NotFoundException();
    }
}

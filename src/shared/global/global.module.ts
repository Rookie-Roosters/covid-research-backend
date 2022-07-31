import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_PROVIDERS, GLOBAL_PROVIDERS_VALUES } from './constants';

@Global()
@Module({
    providers: [
        {
            provide: GLOBAL_PROVIDERS.IS_DEVELOPMENT_ENV,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('ENVIRONMENT') == 'development',
        },
        {
            provide: GLOBAL_PROVIDERS.IS_PRODUCTION_ENV,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('ENVIRONMENT') == 'production',
        },
    ],
    exports: [...GLOBAL_PROVIDERS_VALUES],
})
export class GlobalModule {}

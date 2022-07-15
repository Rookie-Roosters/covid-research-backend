import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SHARED_PROVIDERS } from './constants';

@Global()
@Module({
    providers: [
        {
            provide: SHARED_PROVIDERS.IS_DEVELOPMENT,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('NODE_ENV') == 'development',
        },
        {
            provide: SHARED_PROVIDERS.IS_PRODUCTION,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('NODE_ENV') == 'production',
        },
    ],
    exports: [...Object.values(SHARED_PROVIDERS)],
})
export class SharedModule {}

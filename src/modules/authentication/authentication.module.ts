import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@users/users.module';
import { AuthenticationController } from './controllers';
import { AuthenticationService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' }, //@Inject(GLOBAL_PROVIDERS.IS_PRODUCTION_ENV) private readonly isProductionEnv: boolean
            }),
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { GLOBAL_PROVIDERS } from '@shared/global/constants';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
    private username: string;
    private password: string;
    private port: number;

    constructor(private configService: ConfigService, @Inject(GLOBAL_PROVIDERS.IS_DEVELOPMENT_ENV) private readonly isDevelopmentEnv: boolean) {
        this.username = this.configService.get<string>('DATABASE_USER');
        this.password = this.configService.get<string>('DATABASE_PASSWORD');
        this.port = +this.configService.get<number>('DATABASE_PORT');
        if (!this.username || !this.password || !this.port) throw new Error('Must provide connection variables');
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: 'localhost',
            port: this.port,
            username: this.username,
            password: this.password,
            autoLoadEntities: true,
            synchronize: this.isDevelopmentEnv,
            extra: {
                trustServerCertificate: true,
            },
        };
    }
}

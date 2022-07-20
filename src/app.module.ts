import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '@config/database';
import { UsersModule } from '@users/users.module';
import { HttpExceptionFilter } from '@utils/filters';
import { GlobalModule } from '@shared/global/global.module';
import { ResearchesModule } from '@researches/researches.module';
import { BookmarksModule } from '@bookmarks/bookmarks.module';
import { CovidInfoModule } from './modules/covid-info/covid-info.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseService,
        }),
        ScheduleModule.forRoot(),
        ResearchesModule,
        UsersModule,
        BookmarksModule,
        CovidInfoModule,
        GlobalModule,
        AuthenticationModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '@config/database';
import { BookmarksModule } from '@bookmarks/bookmarks.module';
import { SearchesModule } from '@searches/searches.module';
import { ResearchesModule } from '@researches/researches.module';
import { UsersModule } from '@users/users.module';
import { HttpExceptionFilter } from '@utils/filters';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseService,
        }),
        ResearchesModule,
        UsersModule,
        BookmarksModule,
        SearchesModule,
        SharedModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
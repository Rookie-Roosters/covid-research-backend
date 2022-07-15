import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ResearchesModule } from './modules/researches/researches.module';
import { CovidInfoModule } from './modules/covid-info/covid-info.module';
import { SourceRegistersModule } from './modules/source-registers/source-registers.module';
import { CsvModule } from './modules/csv/csv.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'mssql1Ipw',
      database: 'test3',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
      //ustServerCertificate: true,
    }),
    UsersModule,
    ResearchesModule,
    CovidInfoModule,
    SourceRegistersModule,
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

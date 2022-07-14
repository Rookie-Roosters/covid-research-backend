import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ResearchesModule } from './modules/researches/researches.module';
import { SourceRegistersModule } from './modules/source-registers/source-registers.module';
import { CsvModule } from './modules/csv/csv.module';
import { RecruitmentStatusesModule } from './modules/recruitment-statuses/recruitment-statuses.module';
import { TargetSizeGroupsModule } from './modules/target-size-groups/target-size-groups.module';
import { TargetSizesModule } from './modules/target-sizes/target-sizes.module';
import { StudyTypesModule } from './modules/study-types/study-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'mssql1Ipw',
      database: 'test',
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
    SourceRegistersModule,
    CsvModule,
    RecruitmentStatusesModule,
    TargetSizeGroupsModule,
    TargetSizesModule,
    StudyTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

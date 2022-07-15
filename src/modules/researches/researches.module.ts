import { Module } from '@nestjs/common';
import { ResearchesService } from './services/researches.service';
import { ResearchesController } from './controllers/researches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Research } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Research])],
    controllers: [ResearchesController],
    providers: [ResearchesService],
})
export class ResearchesModule {}

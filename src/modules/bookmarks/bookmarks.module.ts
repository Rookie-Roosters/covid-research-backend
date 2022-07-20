import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchesModule } from '@researches/researches.module';
import { BookmarksController } from './controllers';
import { Bookmark } from './entities';
import { BookmarksService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([Bookmark]), ResearchesModule],
    controllers: [BookmarksController],
    providers: [BookmarksService],
})
export class BookmarksModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksController } from './controllers';
import { Bookmark } from './entities';
import { BookmarksService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([Bookmark])],
    controllers: [BookmarksController],
    providers: [BookmarksService],
})
export class BookmarksModule {}

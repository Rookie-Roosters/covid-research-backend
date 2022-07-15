import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchesController } from './controllers';
import { Search } from './entities';
import { SearchesService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([Search])],
    controllers: [SearchesController],
    providers: [SearchesService],
})
export class SearchesModule {}

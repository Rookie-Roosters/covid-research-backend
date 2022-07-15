import { Module } from '@nestjs/common';
import { SourceRegistersService } from './source-registers.service';
import { SourceRegistersController } from './source-registers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceRegister } from './entities/source-register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SourceRegister])],
  controllers: [SourceRegistersController],
  providers: [SourceRegistersService],
})
export class SourceRegistersModule {}

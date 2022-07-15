import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SourceRegistersService } from '../services/source-registers.service';

@Controller('source-registers')
export class SourceRegistersController {
  constructor(
    private readonly sourceRegistersService: SourceRegistersService,
  ) {}

  @Get()
  async findAll() {
    return await this.sourceRegistersService.findAll();
  }
}

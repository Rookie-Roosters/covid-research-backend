import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SourceRegistersService } from './source-registers.service';
import { CreateSourceRegisterDto } from './dto/create-source-register.dto';
import { UpdateSourceRegisterDto } from './dto/update-source-register.dto';

@Controller('source-registers')
export class SourceRegistersController {
  constructor(
    private readonly sourceRegistersService: SourceRegistersService,
  ) {}

  @Post()
  async create(@Body() createSourceRegisterDto: CreateSourceRegisterDto) {
    return await this.sourceRegistersService.create(createSourceRegisterDto);
  }

  @Get()
  async findAll() {
    return await this.sourceRegistersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sourceRegistersService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSourceRegisterDto: UpdateSourceRegisterDto,
  ) {
    return this.sourceRegistersService.update(+id, updateSourceRegisterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sourceRegistersService.remove(+id);
  }
}

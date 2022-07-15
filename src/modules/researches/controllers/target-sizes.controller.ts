import { Controller, Get, Param } from '@nestjs/common';
import { TargetSizesService } from '../services/target-sizes.service';
@Controller('target-sizes')
export class TargetSizesController {
  constructor(private readonly targetSizesService: TargetSizesService) {}

  @Get()
  findAll() {
    return this.targetSizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetSizesService.findOne(+id);
  }
}

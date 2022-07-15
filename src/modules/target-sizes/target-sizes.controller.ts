import { Controller } from '@nestjs/common';
import { TargetSizesService } from './target-sizes.service';
import { CreateTargetSizeDto } from './dto/create-target-size.dto';
import { UpdateTargetSizeDto } from './dto/update-target-size.dto';

@Controller('target-sizes')
export class TargetSizesController {
  constructor(private readonly targetSizesService: TargetSizesService) {}

  // @Post()
  // create(@Body() createTargetSizeDto: CreateTargetSizeDto) {
  //   return this.targetSizesService.create(createTargetSizeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.targetSizesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.targetSizesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTargetSizeDto: UpdateTargetSizeDto) {
  //   return this.targetSizesService.update(+id, updateTargetSizeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.targetSizesService.remove(+id);
  // }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RecruitmentStatusesService } from './recruitment-statuses.service';
import { CreateRecruitmentStatusDto } from './dto/create-recruitment-status.dto';
import { UpdateRecruitmentStatusDto } from './dto/update-recruitment-status.dto';

@Controller('recruitment-statuses')
export class RecruitmentStatusesController {
  constructor(
    private readonly recruitmentStatusesService: RecruitmentStatusesService,
  ) {}

  @Post()
  create(@Body() createRecruitmentStatusDto: CreateRecruitmentStatusDto) {
    return this.recruitmentStatusesService.create(createRecruitmentStatusDto);
  }

  @Get()
  findAll() {
    return this.recruitmentStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentStatusesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecruitmentStatusDto: UpdateRecruitmentStatusDto,
  ) {
    return this.recruitmentStatusesService.update(
      +id,
      updateRecruitmentStatusDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentStatusesService.remove(+id);
  }
}

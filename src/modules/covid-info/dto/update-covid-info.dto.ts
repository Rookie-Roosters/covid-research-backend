import { PartialType } from '@nestjs/swagger';
import { CreateCovidInfoDto } from './create-covid-info.dto';

export class UpdateCovidInfoDto extends PartialType(CreateCovidInfoDto) {}

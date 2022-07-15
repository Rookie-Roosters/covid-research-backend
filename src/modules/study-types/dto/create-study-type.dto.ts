import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateStudyTypeDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  value: string;
}

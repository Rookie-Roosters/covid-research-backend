import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateRecruitmentStatusDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  value: string;
}
